import AbstractComponent from './abstract-component';

const createExtraFilmsSectionTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraFilmsSection extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsSectionTemplate(this._title);
  }
}
