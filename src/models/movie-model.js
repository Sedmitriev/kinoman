export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.filmInfo = {
      title: data.film_info.title,
      alterTitle: data.film_info.alternative_title,
      totalRating: data.film_info.total_raiting,
      poster: data.film_info.poster,
      ageRaiting: data.film_info.age_rating,
      director: data.film_info.director,
      writers: data.film_info.writers,
      actors: data.film_info.actors,
      release: {
        date: new Date(data.film_info.release.date),
        country: data.film_info.release.release_country
      },
      runtime: data.film_info.runtime,
      genre: data.film_info.genre,
      description: data.film_info.description
    };
    this.userDetails = {
      watchlist: data.user_details.watchlist,
      watched: data.user_details.already_watched,
      favorite: data.user_details.favorite,
      watchingDate: new Date(data.user_details.watching_date)
    };
  }

  toRaw() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.filmInfo.title,
        "alternative_title": this.filmInfo.alterTitle,
        "total_rating": this.filmInfo.totalRating,
        "poster": this.filmInfo.poster,
        "age_rating": this.filmInfo.ageRaiting,
        "director": this.filmInfo.director,
        "writers": this.filmInfo.writers,
        "actors": this.filmInfo.actors,
        "release": {
          "date": this.filmInfo.release.date ? this.filmInfo.release.date.toISOString() : null,
          "release_country": this.filmInfo.release.country
        },
        "runtime": this.filmInfo.runtime,
        "genre": this.filmInfo.genre,
        "description": this.filmInfo.description,
      },
      "user_details": {
        "watchlist": this.userDetails.watchlist,
        "already_watched": this.userDetails.watched,
        "watching_date": this.userDetails.watchingDate,
        "favorite": this.userDetails.favorite,
      }
    };
  }

  static parseItem(data) {
    return new Movie(data);
  }

  static parseList(data) {
    return data.map(Movie.parseItem);
  }

  static cloneItem(data) {
    return new Movie(data.toRAW());
  }
}
