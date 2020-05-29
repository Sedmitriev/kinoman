import {extractDate} from '../utils/common';
import AbstractComponent from './abstract-component';

const createCommentTemplate = (comment) => {
  const date = extractDate(comment.date);
  const {year, month, day, hours, minutes} = date;
  const fulldate = `${year}/${month}/${day} ${hours}:${minutes}`;
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

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  generateCommentsList() {
    this._comment.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });

    return this._comment.reduce((acc, item) => {
      return acc + this.getTemplate(item);
    }, ``);
  }

  getTemplate(comments) {
    return createCommentTemplate(comments);
  }
}
