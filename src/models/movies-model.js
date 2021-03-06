import {FilterType} from '../utils/const';
import {getMoviesByFilter} from '../utils/filter';

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL_MOVIES;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  getAllMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  // removeMovie(id) {
  //   const index = this._movies.findIndex((it) => it.id === id);

  //   if (index === -1) {
  //     return false;
  //   }

  //   this._movies = [].concat(this._movies.slice(0, index), this._movies.slice(index + 1));
  //   this._callHandlers(this._dataChangeHandlers);

  //   return true;
  // }

  updateMovies(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
