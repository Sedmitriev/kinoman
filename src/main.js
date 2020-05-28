import Profile from './components/profile';
import Menu from './components/site-menu';
import Sort from './components/sort';
import FilmsSection from './components/films-section';
import ExtraFilmsSection from './components/extra-films-section';
import FilmCard from './components/film-card';
import ShowMoreButton from './components/show-more-button';
import FilmDetails from './components/film-details';
import Statistics from './components/statistics';
import NoFilms from './components/no-films';
import {generateFilmCards} from './mock/film-card';
import {getRandomIntegerNumber, sortTopRatedFilms, sortMostCommentedFilms, render, RenderPosition} from './utils';
import {FILMS_ON_START, ALL_FILMS, EXTRA_FILMS, SHOW_FILMS_BY_BTN, ESC_KEY_CODE} from './const';

const allFilms = generateFilmCards(ALL_FILMS);
const topRatedFilms = sortTopRatedFilms(allFilms);
const mostCommentedFilms = sortMostCommentedFilms(allFilms);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerStatisticsSection = document.querySelector(`.footer__statistics`);
const profileRating = getRandomIntegerNumber(0, 30);

const renderFilmCard = (container, film) => {
  const filmCardElement = new FilmCard(film).getElement();

  render(container, filmCardElement, RenderPosition.BEFOREEND);

  const filmDetails = new FilmDetails(film);
  const filmDetailsElement = filmDetails.getElement();
  const posterElement = filmCardElement.querySelector(`.film-card__poster`);
  const titleElement = filmCardElement.querySelector(`.film-card__title`);
  const commentsCountElement = filmCardElement.querySelector(`.film-card__comments`);
  const closePopupBtn = filmDetailsElement.querySelector(`.film-details__close-btn`);

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }
  };

  const openPopup = () => {
    render(document.body, filmDetailsElement, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () =>{
    document.body.removeChild(filmDetailsElement);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  posterElement.addEventListener(`click`, openPopup);

  titleElement.addEventListener(`click`, openPopup);

  commentsCountElement.addEventListener(`click`, openPopup);

  closePopupBtn.addEventListener(`click`, closePopup);
};

render(headerElement, new Profile(profileRating).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Menu(allFilms).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(footerStatisticsSection, new Statistics(allFilms).getElement(), RenderPosition.BEFOREEND);

if (allFilms.length) {
  render(mainElement, new FilmsSection().getElement(), RenderPosition.BEFOREEND);

  const allFilmsListElement = mainElement.querySelector(`.films-list`);
  const allFilmsListContainer = allFilmsListElement.querySelector(`.films-list__container`);

  for (let i = 0; i < FILMS_ON_START; i++) {
    renderFilmCard(allFilmsListContainer, allFilms[i]);
  }

  render(allFilmsListElement, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const filmsSection = document.querySelector(`.films`);
  if (topRatedFilms) {
    const topRatedFilmsSectionElement = new ExtraFilmsSection(`Top rated`).getElement();
    render(filmsSection, topRatedFilmsSectionElement, RenderPosition.BEFOREEND);
    const topRatedFilmsListContainer = topRatedFilmsSectionElement.querySelector(`.films-list__container`);
    for (let i = 0; i < EXTRA_FILMS; i++) {
      renderFilmCard(topRatedFilmsListContainer, topRatedFilms[i]);
    }
  }
  if (mostCommentedFilms) {
    const mostCommentedFilmsSectionElement = new ExtraFilmsSection(`Most commented`).getElement();
    render(filmsSection, mostCommentedFilmsSectionElement, RenderPosition.BEFOREEND);
    const mostCommentedFilmsListContainer = mostCommentedFilmsSectionElement.querySelector(`.films-list__container`);
    for (let i = 0; i < EXTRA_FILMS; i++) {
      renderFilmCard(mostCommentedFilmsListContainer, mostCommentedFilms[i]);
    }
  }

  let countFilms = FILMS_ON_START;
  const showMoreBtn = filmsSection.querySelector(`.films-list__show-more`);
  showMoreBtn.addEventListener(`click`, (evt) => {
    const filmsListContainer = evt.target.parentElement.querySelector(`.films-list__container`);
    const from = countFilms;
    countFilms += SHOW_FILMS_BY_BTN;

    const nextFilms = allFilms.slice(from, countFilms);

    if (nextFilms.length < SHOW_FILMS_BY_BTN) {
      showMoreBtn.parentNode.removeChild(showMoreBtn);
    }

    for (let i = 0; i < nextFilms.length; i++) {
      renderFilmCard(filmsListContainer, nextFilms[i]);
    }
  });
} else {
  render(mainElement, new NoFilms().getElement(), RenderPosition.BEFOREEND);
}

