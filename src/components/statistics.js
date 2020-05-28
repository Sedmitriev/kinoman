import {createElement} from '../utils';

const createStatisticsTemplate = (films) => {
  const statistics = films.length;

  return (
    `<p>${statistics} movies inside</p>`
  );
};

export default class Statistics {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
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
