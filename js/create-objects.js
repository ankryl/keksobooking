import { getRandomArbitrary, getRandomElementArr } from './util.js';

const OBJECT_COUNT = 10;

let objects = [];
let authors = [];

const DIAP_PHOTOS = {
  MIN: 1,
  MAX: 3,
};

const generateAuthor = () => {
  const avatar =
    'img/avatars/user' + String('0' + getRandomArbitrary(1, 10, 0)) + '.png';
  return avatar;
};

const iterateAuthors = () => {
  for (let index = 0; index < OBJECT_COUNT; index++) {
    authors.push(generateAuthor());
  }
  return authors;
};

while (authors.length !== 10) {
  authors = iterateAuthors();
  authors = Array.from(new Set(authors));
}

const generateLocations = () => {
  const locations = {
    x: getRandomArbitrary(35.65, 35.7, 5),
    y: getRandomArbitrary(139.7, 139.8, 5),
  };
  return locations;
};

const type = ['palace', 'flat', 'house', 'bungalow'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const services = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const images = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const addFeatures = () => {
  const features = { features: [] };

  for (let i = 0; i < getRandomArbitrary(0, 5, 0); i++) {
    features.features.push(
      getRandomElementArr(services),
    );
  }
  features.features = Array.from(new Set(features.features));
  return features.features;
};

const addPhotos = () => {
  const photos = [];

  for (
    let i = 0;
    i < getRandomArbitrary(DIAP_PHOTOS.MIN, DIAP_PHOTOS.MAX, 0);
    i++
  ) {
    photos.push({
      photos: getRandomElementArr(images),
    });
  }
  return photos;
};

const generateOffers = () => {
  const offer = {
    title: 'Заголовок',
    address: '{{location.x}} , {{location.y}}',
    price: getRandomArbitrary(1, 100, 0),
    type: getRandomElementArr(type),
    rooms: getRandomArbitrary(1, 5, 0),
    guests: getRandomArbitrary(1, 5, 0),
    checkin: getRandomElementArr(checkin),
    checkout: getRandomElementArr(checkout),
    features: addFeatures(),
    descriptions: 'Описание помещения',
    photos: addPhotos(),
  };
  return offer;
};

const addObject = () => {
  for (let i = 0; i < OBJECT_COUNT; i++) {
    objects.push({
      author: { avatar: authors[i] },
      offer: generateOffers(),
      location: generateLocations(),
    });
  }
};

addObject();

export {objects}




