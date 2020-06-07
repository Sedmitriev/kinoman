import FilmsListComponent from '../components/films-list';
import SortComponent, {SortType} from '../components/sort';
import ExtraFilmsListComponent from '../components/extra-films-list';
import ShowMoreButtonComponent from '../components/show-more-button';
import NoFilmsComponent from '../components/no-films';
import {sortTopRatedFilms, sortMostCommentedFilms, sortFilmsByDate} from '../utils/common';
import {render, RenderPosition, remove} from '../utils/render';
import {FILMS_ON_START, EXTRA_FILMS, SHOW_FILMS_BY_BTN} from '../utils/const';
import MovieController from './movie-controller';

const Sections = {
  RATING: `Top Rated`,
  COMMENTS: `Most commented`
};

let countFilms = FILMS_ON_START;

const renderFilmCards = (filmListElement, films, count, onDataChange, onViewChange) => {
  const movieControllers = [];
  for (let i = 0; i < count; i++) {
    const movieController = new MovieController(filmListElement, onDataChange, onViewChange);
    movieController.render(films[i]);
    movieControllers.push(movieController);
  }
  return movieControllers;
};

const getSortedCards = (cards, sortType) => {
  let sortedCards = [];
  const showingCards = cards.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedCards = sortFilmsByDate(cards);
      break;
    case SortType.RATING:
      sortedCards = sortTopRatedFilms(cards);
      break;
    case SortType.DEFAULT:
      sortedCards = showingCards;
      break;
  }

  return sortedCards;
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    // this._films = [];
    this._api = api;
    this._moviesModel = moviesModel;
    this._shownMovieControllers = [];
    this._filmsListComponent = new FilmsListComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._filmsListComponent = new FilmsListComponent();
    this._filmsList = this._filmsListComponent.getElement();
    this._filmsListContainer = this._filmsListComponent.filmsListElement;

    this._filmsListTopRatedComponent = null;
    this._filmsListMostCommentedComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClickHandler = this._onShowMoreButtonClickHandler.bind(this);

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._moviesModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  _loadFilms() {
    this._api.getMovies()
    .then((films) => {
      this._moviesModel.setMovies(films);
    });
  }

  render() {
    this._filmsListTopRatedComponent = new ExtraFilmsListComponent(Sections.RATING);
    this._filmsListMostCommentedComponent = new ExtraFilmsListComponent(Sections.COMMENTS);
    const films = this._moviesModel.getMovies();
    const topRatedFilms = sortTopRatedFilms(films);
    const mostCommentedFilms = sortMostCommentedFilms(films);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    if (films.length) {
      const newCards = renderFilmCards(this._filmsListContainer, films, FILMS_ON_START, this._onDataChange, this._onViewChange);
      this._shownMovieControllers = this._shownMovieControllers.concat(newCards);
      this._renderShowMoreButton();
      // if (countFilms < films.length) {
      //   this._renderShowMoreButton();
      // } else {
      //   remove(this._showMoreButtonComponent);
      //   this._showMoreButtonComponent = null;
      // }

      if (topRatedFilms) {
        render(this._container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
        renderFilmCards(this._filmsListTopRatedComponent.filmsListContainer, topRatedFilms, EXTRA_FILMS, this._onDataChange, this._onViewChange);
      }
      if (mostCommentedFilms) {
        render(this._container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);
        renderFilmCards(this._filmsListMostCommentedComponent.filmsListContainer, mostCommentedFilms, EXTRA_FILMS, this._onDataChange, this._onViewChange);
      }

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const sortedCards = getSortedCards(films, sortType);
        this._filmsListComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;
        renderFilmCards(this._filmsListContainer, sortedCards, FILMS_ON_START, this._onDataChange, this._onViewChange);
        // this._renderShowMoreButton();
      });
    } else {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }
  }

  _onShowMoreButtonClickHandler() {
    const films = this._moviesModel.getMovies();
    const from = countFilms;
    countFilms += SHOW_FILMS_BY_BTN;
    const nextFilms = films.slice(from, countFilms);
    if (nextFilms.length < SHOW_FILMS_BY_BTN) {
      remove(this._showMoreButtonComponent);
    }

    const newCards = renderFilmCards(this._filmsListContainer, nextFilms, nextFilms.length, this._onDataChange, this._onViewChange);
    this._shownMovieControllers = this._shownMovieControllers.concat(newCards);
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClickHandler);
  }

  _onDataChange(movieController, oldData, newData) {
    if (newData === undefined) {
      this._moviesModel.updateMovies(oldData.id, oldData);
      movieController.render(oldData);
    } else {
      const isSuccess = this._moviesModel.updateMovies(oldData.id, newData);

      if (isSuccess) {
        movieController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._shownMovieControllers.forEach((it) => it.setDefaultView());
  }

  _updateFilmCards() {
    this._shownMovieControllers.forEach((controller) => controller.destroy());
    this._shownMovieControllers = [];
    remove(this._filmsListTopRatedComponent);
    this._filmsListTopRatedComponent = null;
    remove(this._filmsListMostCommentedComponent);
    this._filmsListMostCommentedComponent = null;

    countFilms = FILMS_ON_START;
    this.render();
  }

  _filterChangeHandler() {
    this._updateFilmCards();
  }

}
