import AbstractComponent from "./abstract-component";
import {getFormatYear} from "../utils/common";

const createFilmCardTemplate = (card) => {
  const comments = card.comments;
  const {title, total_rating: rating, runtime, genre,
    poster, description} = card.film_info;
  const {watchlist, already_watched: watched, favorite} = card.user_details;
  const year = getFormatYear(card.film_info.release.date);
  const isWatched = watched ? `film-card__controls-item--active` : ``;
  const isWatchlist = watchlist ? `film-card__controls-item--active` : ``;
  const isFavorite = favorite ? `film-card__controls-item--active` : ``;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="./images/posters/${poster}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button ${isWatchlist} film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button ${isWatched} film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button ${isFavorite} film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setAlreadyWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavouriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
