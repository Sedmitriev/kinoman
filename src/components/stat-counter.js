import AbstractComponent from './abstract-component';

const createStatCounterTemplate = (films) => {
  const statistics = films.length;

  return (
    `<p>${statistics} movies inside</p>`
  );
};

export default class StatCounter extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatCounterTemplate(this._films);
  }
}
