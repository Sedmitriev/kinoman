import moment from "moment";

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomFloatNumber = (min, max, digits = 1) => {
  return parseFloat((getRandomIntegerNumber(min, max) + Math.random()).toFixed(digits));
};

export const getRandomCollection = (array, min, max) => {
  const maxLen = getRandomIntegerNumber(min, max);
  const uniqueValue = new Set();

  for (let i = 0; i < maxLen; i++) {
    uniqueValue.add(array[Math.floor(Math.random() * array.length)] + ` `);
  }

  return Array.from(uniqueValue);
};

export const sortTopRatedFilms = (films) => {
  const clone = films.slice();

  const isRated = films.some((film) => film.film_info.total_rating);

  if (!isRated) {
    return ``;
  }

  return clone.sort((a, b) => {
    return Number(b.film_info.total_rating) - Number(a.film_info.total_rating);
  });
};

export const sortMostCommentedFilms = (films) => {
  const clone = films.slice();

  const isCommented = films.some((film) => {
    return film.comments.length;
  });

  if (!isCommented) {
    return ``;
  }

  return clone.sort((a, b) => {
    return Number(b.comments.length) - Number(a.comments.length);
  });
};

export const sortFilmsByDate = (films) => {
  const clone = films.slice();

  return clone.sort((a, b) => {
    const dateA = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate());
    const dateB = new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate());
    return dateA - dateB; // сортировка по возрастающей дате
  });
};


export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const formatDuration = () => {
  const mins = getRandomIntegerNumber(80, 180);
  const duration = moment.duration(mins, `minutes`);
  return moment.utc(duration.as(`milliseconds`)).format(`H[h] mm[m]`);
};

export const getFormatYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const getFormatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getFormatDatetime = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};
