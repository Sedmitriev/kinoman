import AbstractComponent from './abstract-component';

const createExtraFilmsListTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraFilmsList extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
    this.filmsListContainer = this.getElement().querySelector(`.films-list__container`);
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._title);
  }
}
