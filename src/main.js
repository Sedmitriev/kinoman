import ProfileComponent from './components/profile';
import MenuComponent from './components/site-menu';
import StatisticsComponent from './components/statistics';
import PageController from './controllers/page-controller';
import {generateFilmCards} from './mock/film-card';
import {getRandomIntegerNumber} from './utils/common';
import {render, RenderPosition} from './utils/render';
import {ALL_FILMS} from './utils/const';

const allFilms = generateFilmCards(ALL_FILMS);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerStatisticsSection = document.querySelector(`.footer__statistics`);
const profileRating = getRandomIntegerNumber(0, 30);
const pageController = new PageController(mainElement);

render(headerElement, new ProfileComponent(profileRating), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(allFilms), RenderPosition.BEFOREEND);
pageController.render(allFilms);
render(footerStatisticsSection, new StatisticsComponent(allFilms), RenderPosition.BEFOREEND);

