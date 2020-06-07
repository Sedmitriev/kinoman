import {getRandomIntegerNumber, getRandomFloatNumber, getRandomArrayItem,
  getRandomCollection, getRandomDate, formatDuration} from '../utils/common';
import {MAX_COUNT_COMMENTS} from "../utils/const.js";

const genres = [`drama`, `thriller`, `comedy`, `sci-fi`, `action`, `melodrama`, `biography`, `fantasy`, `criminal`];

const titles = [`Shawshank redemption`, `Green mile`, `Forrest Gump`, `Shindler's list`, `Intouchtables`,
  `Inception`, `Leon`, `Lion King`, `Fight Club`, `La vita e bella`, `Knockin' on heaven's door`,
  `Godfather`, `Pulp fiction`, `Prestige`, `A beautiful mind`, `Interstellar`];

const directors = [`Frank Darabont`, `Robert Zemeckis`, `Quentin Tarantino`, `Steven Spielberg`,
  `Christopher Nolan`, `Francis Ford Coppola`, `David Fincher`, `Stanley Kubrick`];

const writers = [`Billy Wilder`, `Quentin Tarantino`, `Francis Ford Coppola`, `Ethan and Joel Coen`, `Robert Towne`, `Woody Allen`];

const actors = [`Leonardo DiCaprio`, `Christian Bale`, `Daniel Day-Lewis`, `James McAvoy`,
  `Matthew McConaughey`, `Samuel L. Jackson`, `Brad Pitt`, `Jessica Chastain`, `Monica Bellucci`,
  `Charlize Theron`, `Amy Adams`, `Emily Blunt`, `Uma Thurman`];

const ageRating = [`0+`, `6+`, `12+`, `14+`, `18+`];

const authors = [`Ivan`, `Alex`, `Max`, `Anna`, `Nataly`];

const emotions = [`smile`, `sleeping`, `puke`, `angry`];

const country = [`USA`, `Russia`, `Finland`, `Germany`];

let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula
feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam
nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh
vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus
nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc
fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const textArr = text.split(`.`);

const posters = [`made-for-each-other`, `popeye-meets-sinbad`, `sagebrush-trail`,
  `santa-claus-conquers-the-martians`, `the-dance-of-life`, `the-great-flamarion`,
  `the-man-with-the-golden-arm`];

const getDescription = () => {
  const len = getRandomIntegerNumber(1, 3);
  let description = [];
  for (let i = 0; i < len; i++) {
    description.push(getRandomArrayItem(textArr));
  }
  return description.join(`.`);
};

let idCounter = 0;

const generateId = () => {
  return idCounter++;
};

const generateComment = () => {
  return {
    id: generateId(),
    author: getRandomArrayItem(authors),
    text: getDescription(),
    date: getRandomDate(new Date(2020, 0, 1), new Date()),
    emotion: getRandomArrayItem(emotions)
  };
};

const generateComments = (count) => {
  const randomCountComments = getRandomIntegerNumber(0, count);

  return new Array(randomCountComments).fill(``).map(generateComment);
};

const genereteFilmInfo = () => {
  return {
    "title": getRandomArrayItem(titles),
    "alternative_title": getRandomArrayItem(titles),
    "total_rating": getRandomFloatNumber(5, 10),
    "poster": getRandomArrayItem(posters),
    "age_rating": getRandomArrayItem(ageRating),
    "director": getRandomArrayItem(directors),
    "writers": getRandomCollection(writers, 1, 2),
    "actors": getRandomCollection(actors, 1, 5),
    "release": {
      "date": getRandomDate(new Date(1990, 0, 1), new Date()),
      "release_country": getRandomArrayItem(country)
    },
    "runtime": formatDuration(),
    "genre": getRandomCollection(genres, 1, 3),
    "description": getDescription(),
  };
};

const genereteUserDetails = () => {
  return {
    "personal_rating": getRandomIntegerNumber(0, 30),
    "watchlist": Math.random() > 0.5,
    "already_watched": Math.random() > 0.5,
    "watching_date": getRandomDate(new Date(2020, 0, 1), new Date()),
    "favorite": Math.random() > 0.5,
  };
};

export const generateFilmCard = () => {
  return {
    "id": generateId(),
    "comments": generateComments(MAX_COUNT_COMMENTS),
    "film_info": genereteFilmInfo(),
    "user_details": genereteUserDetails()
  };
};

export const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};
