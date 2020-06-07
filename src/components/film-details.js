import AbstractSmartComponent from "./abstract-smart-component.js";
import {getFormatDate} from "../utils/common";

const EMOJI_WIDTH = 55;
const EMOJI_HEIGHT = 55;

const renderGenres = (genres) => {
  return genres.map((item) => {
    return `<span class="film-details__genre">${item.trim()}</span>`;
  }).join(``);
};

const createFilmDetailsTemplate = (card, commentsCount) => {
  const {title, total_rating: rating,
    alternative_title: alterTitle, runtime, genre,
    poster, age_rating: ageRating, description,
    director, writers, actors} = card.film_info;
  const {watchlist, already_watched: watched, favorite} = card.user_details;
  const fulldate = getFormatDate(card.film_info.release.date);
  const country = card.film_info.release.release_country;
  const isWatched = watched ? `checked` : ``;
  const isWatchlist = watchlist ? `checked` : ``;
  const isFavorite = favorite ? `checked` : ``;
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}.jpg" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alterTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${fulldate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${renderGenres(genre)}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-type="smile">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-type="sleeping">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-type="puke">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-type="angry">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, commentsCount) {
    super();
    this._film = film;
    this._commentsCount = commentsCount;
    this._closeBtnClickHandler = null;
    this._addToWatchlistClickHandler = null;
    this._alreadyWatchedClickHandler = null;
    this._addToFavouriteClickHandler = null;
    this._emojiClickHandler = null;
  }

  // rerender() {
  //   super.rerender();
  // }

  getTemplate() {
    // const commetsList = new Comment(this._film.comments).generateCommentsList();
    return createFilmDetailsTemplate(this._film, this._commentsCount);
  }

  getEmojiContainer() {
    return this.getElement().querySelector(`.film-details__add-emoji-label`);
  }

  getFormElement() {
    return this.getElement().querySelector(`.film-details__inner`);
  }

  setCloseBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeBtnClickHandler = handler;
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
    this._addToWatchlistClickHandler = handler;
  }

  setAlreadyWatchedClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
    this._alreadyWatchedClickHandler = handler;
  }

  setAddToFavouriteClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
    this._addToFavouriteClickHandler = handler;
  }

  setEmojiById(id) {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const emojiElement = this.getElement().querySelector(`[for="${id}"] img`).cloneNode(true);

    emojiElement.width = EMOJI_WIDTH;
    emojiElement.height = EMOJI_HEIGHT;

    if (emojiContainer.innerHTML !== ``) {
      emojiContainer.innerHTML = ``;
    }

    emojiContainer.appendChild(emojiElement);
  }

  setEmojiClickHandler(handler) {
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    emojis.forEach((it) => {
      it.addEventListener(`change`, handler);
    });

    this._emojiClickHandler = handler;
  }

  recoveryListeners() {
    this.setCloseBtnClickHandler(this._closeBtnClickHandler);
    this.setAddToWatchlistClickHandler(this._addToWatchlistClickHandler);
    this.setAlreadyWatchedClickHandler(this._alreadyWatchedClickHandler);
    this.setAddToFavouriteClickHandler(this._addToFavouriteClickHandler);
    this.setEmojiClickHandler(this._emojiClickHandler);
  }
}
