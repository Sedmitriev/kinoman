import {MONTHS} from './const';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

export const getRandomDate = () => {
  const now = Date.now();
  const rand = getRandomIntegerNumber(0, 10000);
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

export const createElement = (htmlText) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = htmlText;

  return newElement.firstChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
