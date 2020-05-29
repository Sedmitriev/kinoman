import AbstractComponent from './abstract-component';

const createStatisticsTemplate = (films) => {
  const statistics = films.length;

  return (
    `<p>${statistics} movies inside</p>`
  );
};

export default class Statistics extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }
}
