import {MONTHS} from './const';

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

export const getReleaseDate = () => {
  const month = getRandomIntegerNumber(0, 11);
  const day = (month === 1) ? getRandomIntegerNumber(1, 29) : getRandomIntegerNumber(1, 30);
  return {
    year: getRandomIntegerNumber(1950, 2018),
    month: MONTHS[month],
    day
  };
};

export const getRandomDate = () => {
  const now = Date.now();
  const rand = getRandomIntegerNumber(0, 100000000);
  return (new Date(now - rand)).toISOString();
};

export const extractDate = (str) => {
  let ms = Date.parse(str);
  let date = new Date(ms);

  return {
    year: date.getFullYear(),
    month: MONTHS[date.getMonth()],
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
};

export const sortTopRatedFilms = (films) => {
  const clone = films.slice();

  const isRated = films.some((film) => film.rating);

  if (!isRated) {
    return ``;
  }

  return clone.sort((a, b) => {
    return Number(b.rating) - Number(a.rating);
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
    const dateA = new Date(a.date.year, MONTHS.indexOf(a.date.month), a.date.day);
    const dateB = new Date(b.date.year, MONTHS.indexOf(b.date.month), b.date.day);
    return dateA - dateB; // сортировка по возрастающей дате
  });
};

