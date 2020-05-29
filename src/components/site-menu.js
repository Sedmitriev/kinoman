import AbstractComponent from './abstract-component';

const createSiteMenuTemplate = (cards) => {
  const countWatchlist = cards.filter((card) => card.watchlist).length;
  const countWatched = cards.filter((card) => card.watched).length;
  const countFavorite = cards.filter((card) => card.favorite).length;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countWatchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countWatched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFavorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
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
}
