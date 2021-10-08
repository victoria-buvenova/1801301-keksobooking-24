const accommodationTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const checkins = ['12:00', '13:00','14:00'];
const checkouts = ['12:00', '13:00','14:00'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

/**
 *
 * @returns целое положительное число
 */
function getRandomPositive() {
  return Math.floor(Math.random() * 10);
}

/**
 *
 * @param начало диапазона min
 * @param конец диапазона max
 * @returns целое положительное число в заданном диапазоне
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param array
 * @returns случайный элемент из переданного массива (аrray)
 */
function getRandomArrayElement(array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
}

/**
 *
 * @param начальное значение координаты min
 * @param конечное значение координаты max
 * @returns значение с плавающей точкой в заданном диапазоне
 */
function getRandomCoord(min, max) {
  return Math.random() * (max - min) + min;
}

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
    title: 'Apartments for rent',
    address: `${getLocation().lat}, ${getLocation().lng}`,
    price: getRandomPositive(),
    type: getRandomArrayElement(accommodationTypes),
    rooms: getRandomPositive(),
    guests: getRandomPositive(),
    checkin: getRandomArrayElement(checkins),
    checkout: getRandomArrayElement(checkouts),
    features: features,
    description: 'Best house',
    photos: new Array(getRandomPositive()).fill(null).map(() => getRandomArrayElement(photos)),
  };
}

/**
 *
 * @returns объект advertisement, содержащий объекты author, offer and location
 */
function createAdvertisement() {
  const author = getAuthor();
  const offer = getOffer();
  const location = getLocation();

  return {
    author: author,
    offer: offer,
    location: location,
  };
}

const objectGenerator = new Array(10).fill(null).map(createAdvertisement);

objectGenerator;
