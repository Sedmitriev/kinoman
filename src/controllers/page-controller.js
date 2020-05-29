import FilmsSectionComponent from '../components/films-section';
import FilmsListComponent from '../components/films-list';
import SortComponent, {SortType} from '../components/sort';
import ExtraFilmsSectionComponent from '../components/extra-films-section';
import FilmCardComponent from '../components/film-card';
import ShowMoreButtonComponent from '../components/show-more-button';
import FilmDetailsComponent from '../components/film-details';
import NoFilmsComponent from '../components/no-films';
import {sortTopRatedFilms, sortMostCommentedFilms, sortFilmsByDate} from '../utils/common';
import {render, RenderPosition, remove} from '../utils/render';
import {FILMS_ON_START, EXTRA_FILMS, SHOW_FILMS_BY_BTN, ESC_KEY_CODE} from '../utils/const';

const Sections = {
  RATING: `Top Rated`,
  COMMENTS: `Most commented`
};

const renderFilmCard = (container, film) => {
  const filmCard = new FilmCardComponent(film);
  const filmDetails = new FilmDetailsComponent(film);

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }
  };

  const openPopup = () => {
    render(document.body, filmDetails, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () =>{
    filmDetails.getElement().remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  render(container, filmCard, RenderPosition.BEFOREEND);

  filmCard.setTitleClickHandler(openPopup);
  filmCard.setPosterClickHandler(openPopup);
  filmCard.setCommentsClickHandler(openPopup);
  filmDetails.setCloseBtnClickHandler(closePopup);
};

const renderFilmsSection = (container, component, films, count) => {
  render(container, component, RenderPosition.BEFOREEND);

  for (let i = 0; i < count; i++) {
    renderFilmCard(component.getElement().querySelector(`.films-list__container`), films[i]);
  }
};

const renderShowMoreButton = (container, button, films) => {
  render(container, button, RenderPosition.BEFOREEND);
  let countFilms = FILMS_ON_START;
  button.setClickHandler((evt) => {
    const filmsListContainer = evt.target.parentElement.querySelector(`.films-list__container`);
    const from = countFilms;
    countFilms += SHOW_FILMS_BY_BTN;

    const nextFilms = films.slice(from, countFilms);

    if (nextFilms.length < SHOW_FILMS_BY_BTN) {
      remove(button);
    }

    for (let i = 0; i < nextFilms.length; i++) {
      renderFilmCard(filmsListContainer, nextFilms[i]);
    }
  });
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
    this._filmsSectionComponent = new FilmsSectionComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent();
  }

  render(films) {
    const topRatedFilms = sortTopRatedFilms(films);
    const mostCommentedFilms = sortMostCommentedFilms(films);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    const filmsSection = this._filmsSectionComponent.getElement();

    if (films.length) {
      renderFilmsSection(filmsSection, this._filmsListComponent, films, FILMS_ON_START);
      const allFilmsListElement = this._filmsListComponent.getElement();
      renderShowMoreButton(allFilmsListElement, this._showMoreButtonComponent, films);

      if (topRatedFilms) {
        const topRatedFilmsSection = new ExtraFilmsSectionComponent(Sections.RATING);
        renderFilmsSection(filmsSection, topRatedFilmsSection, topRatedFilms, EXTRA_FILMS);
      }
      if (mostCommentedFilms) {
        const mostCommentedFilmsSection = new ExtraFilmsSectionComponent(Sections.COMMENTS);
        renderFilmsSection(filmsSection, mostCommentedFilmsSection, mostCommentedFilms, EXTRA_FILMS);
      }

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const sortedCards = getSortedCards(films, sortType);
        this._filmsListComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;
        renderFilmsSection(this._container, this._filmsSectionComponent, sortedCards, FILMS_ON_START);
        renderShowMoreButton(allFilmsListElement, this._showMoreButtonComponent, sortedCards);
      });
    } else {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }
  }
}
