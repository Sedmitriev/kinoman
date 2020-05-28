import {getRandomIntegerNumber, getRandomFloatNumber, getRandomArrayItem,
  getRandomCollection, getRandomDate} from '../utils';
import {MAX_COUNT_COMMENTS} from "../const.js";

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

const getDuration = () => {
  let hours = getRandomIntegerNumber(1, 3);
  let minutes = getRandomIntegerNumber(0, 60);
  return `${hours}h ${minutes}m`;
};

const generateComment = () => {
  return {
    author: getRandomArrayItem(authors),
    text: getDescription(),
    date: getRandomDate(),
    emotion: getRandomArrayItem(emotions)
  };
};

const generateComments = (count) => {
  const randomCountComments = getRandomIntegerNumber(0, count);

  return new Array(randomCountComments).fill(``).map(generateComment);
};

export const generateFilmCard = () => {
  return {
    title: getRandomArrayItem(titles),
    rating: getRandomFloatNumber(7, 10),
    year: getRandomIntegerNumber(1950, 2018),
    duration: getDuration(),
    genre: getRandomCollection(genres, 1, 3),
    poster: getRandomArrayItem(posters),
    ageRating: getRandomArrayItem(ageRating),
    description: getDescription(),
    director: getRandomArrayItem(directors),
    writers: getRandomCollection(writers, 1, 2),
    actors: getRandomCollection(actors, 1, 5),
    comments: generateComments(MAX_COUNT_COMMENTS),
    watchlist: Math.random() > 0.5,
    watched: Math.random() > 0.5,
    favorite: Math.random() > 0.5,
  };
};

export const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};
