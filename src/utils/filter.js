import {FilterType} from './const';

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST: {
      return movies.filter((movie) => movie.watchlist);
    }
    case FilterType.HISTORY: {
      return movies.filter((movie) => movie.watched);
    }
    case FilterType.FAVORITES: {
      return movies.filter((movie) => movie.favorite);
    }
    default: {
      return movies;
    }
  }
};
