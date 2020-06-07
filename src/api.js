import Movie from './models/movie-model';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, autorization) {
    this._endPoint = endPoint;
    this._autorization = autorization;
  }

  getMovies() {
    return this._load({url: `movies/`})
    .then((response) => response.json())
    .then(Movie.parseList());
  }

  // updateMovie(id, movie) {

  // }

  // getComments(movieId) {

  // }

  // createComment(id, comment) {

  // }

  // deleteComment(id) {

  // }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw new Error(err);
      });
  }
}
