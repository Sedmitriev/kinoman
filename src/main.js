import ProfileComponent from './components/profile';
import MenuComponent from './components/site-menu';
import StatCounterComponent from './components/stat-counter';
import FilmsSectionComponent from './components/films-section';
import StatisticsComponent from './components/statistics';
import PageController from './controllers/page-controller';
import {generateFilmCards} from './mock/film-card';
import {getRandomIntegerNumber} from './utils/common';
import {render, RenderPosition} from './utils/render';
import {ALL_FILMS, ScreenMode, AUTHORIZATION, END_POINT} from './utils/const';
import MoviesModel from './models/movies-model';
import FilterController from './controllers/filter-controller';
import API from './api';

const allFilms = generateFilmCards(ALL_FILMS);
const moviesModel = new MoviesModel();
moviesModel.setMovies(allFilms);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const filmSection = new FilmsSectionComponent();
const footerStatisticsSection = document.querySelector(`.footer__statistics`);
const profileRating = getRandomIntegerNumber(0, 30);
const api = new API(END_POINT, AUTHORIZATION);
const pageController = new PageController(filmSection.getElement(), moviesModel, api);
const menuComponent = new MenuComponent();
const filterController = new FilterController(menuComponent.getElement(), moviesModel);
const statisticsComponent = new StatisticsComponent();

render(headerElement, new ProfileComponent(profileRating), RenderPosition.BEFOREEND);
render(mainElement, menuComponent, RenderPosition.BEFOREEND);
render(mainElement, filmSection, RenderPosition.BEFOREEND);
filterController.render();
pageController.render();
render(footerStatisticsSection, new StatCounterComponent(allFilms), RenderPosition.BEFOREEND);
render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();
menuComponent.setScreenChangeHandler((mode) => {
  switch (mode) {
    case ScreenMode.STATISTIC:
      filmSection.hide();
      statisticsComponent.show();
      break;
    case ScreenMode.MAIN:
      statisticsComponent.hide();
      filmSection.show();
      break;
  }
});


