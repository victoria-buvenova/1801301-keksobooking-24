import {getRandomPositive, getRandomIntInclusive, getRandomArrayElement, getRandomCoord} from './utils.js';

const accommodationTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const checkins = ['12:00', '13:00','14:00'];
const checkouts = ['12:00', '13:00','14:00'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const descriptions = ['Best house', 'Cosy flat', 'Comfortable palace', 'Best price on the market', 'Real Japan'];
const titles = ['Apartment for rent', 'House for rent', 'Palace for rent'];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;


/**
 * @returns объект author
 */
function getAuthor() {
  const randomNumber = getRandomIntInclusive(1, 10);
  const imgAuthor = randomNumber !== 10 ? `0${randomNumber}` : randomNumber;
  return {
    avatar: `img/avatars/user${imgAuthor}.png`,
  };
}

/**
 * @returns объект location
 */
function getLocation() {
  return {
    lat: getRandomCoord(LAT_MIN, LAT_MAX),
    lng: getRandomCoord(LNG_MIN, LNG_MAX),
  };
}

/**
 * @returns объект offer
 */
function getOffer() {
  return {
    title: getRandomArrayElement(titles),
    address: `${getLocation().lat}, ${getLocation().lng}`,
    price: getRandomPositive(),
    type: getRandomArrayElement(accommodationTypes),
    rooms: getRandomPositive(),
    guests: getRandomPositive(),
    checkin: getRandomArrayElement(checkins),
    checkout: getRandomArrayElement(checkouts),
    features: features,
    description: getRandomArrayElement(descriptions),
    photos: new Array(getRandomPositive()).fill(null).map(() => getRandomArrayElement(photos)),
  };
}
export {getAuthor, getLocation, getOffer};
