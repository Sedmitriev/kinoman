import AbstractComponent from './abstract-component';

const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional" data-mode="stats">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._cards);
  }

  setScreenChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const target = evt.target.closest(`a`);

      if (!target) {
        return;
      }

      const mode = target.dataset.mode;

      handler(mode);
    });
  }
}
