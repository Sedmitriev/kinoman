import {getFormatDatetime} from '../utils/common';
import AbstractSmartComponent from "./abstract-smart-component.js";

const createCommentTemplate = (comment) => {
  const fulldate = getFormatDatetime(comment.date);
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${fulldate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
    this._isDeletingMode = false;
  }

  // generateCommentsList() {
  //   this._comment.sort((a, b) => {
  //     return Date.parse(b.date) - Date.parse(a.date);
  //   });

  //   return this._comment.reduce((acc, item) => {
  //     return acc + this.getTemplate(item);
  //   }, ``);
  // }

  getTemplate(comments) {
    return createCommentTemplate(comments);
  }

  setDeleteButtonHandler(handler) {
    const deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);
    deleteButton.addEventListener(`click`, (evt) => {
      this._isDeletingMode = true;

      this.rerender();
      handler(evt);
    });
  }

  getCommentId() {
    return this._comment.id;
  }

  recoveryListeners() {

  }
}
