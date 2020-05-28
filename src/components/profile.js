import {createElement} from '../utils';

const createProfileTemplate = (count) => {
  let profileRating = ``;
  switch (true) {
    case count >= 1 && count <= 10:
      profileRating = `Novice`;
      break;
    case count >= 11 && count <= 20:
      profileRating = `Fan`;
      break;
    case count >= 21:
      profileRating = `Movie Buff`;
      break;
    default:
      profileRating = ``;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
