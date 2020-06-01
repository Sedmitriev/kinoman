import {render, replace, remove, RenderPosition} from '../utils/render';
import FilmCardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import {ESC_KEY_CODE} from '../utils/const';

export const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscPress = this._onEscPress.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setTitleClickHandler(() => this._openFilmDetails());
    this._filmCardComponent.setPosterClickHandler(() => this._openFilmDetails());
    this._filmCardComponent.setCommentsClickHandler(() => this._openFilmDetails());
    this._filmDetailsComponent.setCloseBtnClickHandler(() => {
      this._closeFilmDetails();
    });

    this._filmCardComponent.setAddToWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        watchlist: !film.watchlist
      }));
    });

    this._filmCardComponent.setAlreadyWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        watched: !film.watched
      }));
    });

    this._filmCardComponent.setAddToFavouriteClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        favorite: !film.favorite
      }));
    });

    this._filmDetailsComponent.setAddToWatchlistClickHandler(() => {
      remove(this._filmDetailsComponent);
      this._onDataChange(this, film, Object.assign({}, film, {
        watchlist: !film.watchlist
      }));
    });

    this._filmDetailsComponent.setAlreadyWatchedClickHandler(() => {
      remove(this._filmDetailsComponent);
      this._onDataChange(this, film, Object.assign({}, film, {
        watched: !film.watched
      }));
    });

    this._filmDetailsComponent.setAddToFavouriteClickHandler(() => {
      remove(this._filmDetailsComponent);
      this._onDataChange(this, film, Object.assign({}, film, {
        favorite: !film.favorite
      }));
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  _openFilmDetails() {
    this._onViewChange();
    document.body.appendChild(this._filmDetailsComponent.getElement());
    this._mode = Mode.DETAILS;
    this._filmDetailsComponent.recoveryListeners();
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _closeFilmDetails() {
    document.removeEventListener(`keydown`, this._onEscPress);
    remove(this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this._closeFilmDetails();
    }
  }
}
