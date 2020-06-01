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
  constructor(container) {
    this._container = container;
    this._films = [];
    this._movieControllers = [];
    this._filmsListComponent = new FilmsListComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._filmsListComponent = new FilmsListComponent();
    this._filmsList = this._filmsListComponent.getElement();
    this._filmsListContainer = this._filmsListComponent.filmsListElement;

    this._filmsListTopRatedComponent = new ExtraFilmsListComponent(Sections.RATING);
    this._filmsListMostCommentedComponent = new ExtraFilmsListComponent(Sections.COMMENTS);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    const topRatedFilms = sortTopRatedFilms(this._films);
    const mostCommentedFilms = sortMostCommentedFilms(this._films);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    if (this._films.length) {
      const newCards = renderFilmCards(this._filmsListContainer, this._films, FILMS_ON_START, this._onDataChange, this._onViewChange);
      this._movieControllers = this._movieControllers.concat(newCards);
      this._renderShowMoreButton();

      if (topRatedFilms) {
        render(this._container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
        renderFilmCards(this._filmsListTopRatedComponent.filmsListContainer, topRatedFilms, EXTRA_FILMS, this._onDataChange, this._onViewChange);
      }
      if (mostCommentedFilms) {
        render(this._container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);
        renderFilmCards(this._filmsListMostCommentedComponent.filmsListContainer, mostCommentedFilms, EXTRA_FILMS, this._onDataChange, this._onViewChange);
      }

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const sortedCards = getSortedCards(this._films, sortType);
        this._filmsListComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;
        renderFilmCards(this._filmsListContainer, sortedCards, FILMS_ON_START, this._onDataChange, this._onViewChange);
        this._renderShowMoreButton();
      });
    } else {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    let countFilms = FILMS_ON_START;
    this._showMoreButtonComponent.setClickHandler(() => {
      const from = countFilms;
      countFilms += SHOW_FILMS_BY_BTN;

      const nextFilms = this._films.slice(from, countFilms);

      if (nextFilms.length < SHOW_FILMS_BY_BTN) {
        remove(this._showMoreButtonComponent);
      }

      const newCards = renderFilmCards(this._filmsListContainer, nextFilms, nextFilms.length, this._onDataChange, this._onViewChange);
      this._movieControllers = this._movieControllers.concat(newCards);
      // const movieControllers = [];
      // for (let i = 0; i < nextFilms.length; i++) {
      //   const movieController = new MovieController(this._filmsListContainer, this._onDataChange, this._onViewChange);
      //   movieController.render(nextFilms[i]);
      //   movieControllers.push(movieController);
      // }
      // this._movieControllers = this._movieControllers.concat(movieControllers);
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._movieControllers.forEach((it) => it.setDefaultView());
  }
}
