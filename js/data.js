import {getRandomPositive, getRandomIntInclusive, getRandomArrayElement, getRandomCoord} from './utils.js';

import {accommodationTypes, features, checkins, checkouts, photos,descriptions, titles} from './mocks.js';

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
    lat: getRandomCoord(LAT_MIN, LAT_MAX).toFixed(5),
    lng: getRandomCoord(LNG_MIN, LNG_MAX).toFixed(5),
  };
}

/**
 * создает рандомное количество удобств
 * @returns массив удобств
 */
function getFeatures () {
  const featuresResult = [];
  const featuresNumber = getRandomIntInclusive (1, features.length);
  for (let i = 0; i < featuresNumber; i++) {
    const newFeature = features[i];
    if (!featuresResult.includes(newFeature)) {
      featuresResult[i] = newFeature;
    }
  }
  return featuresResult;
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
    features: getFeatures(),
    description: getRandomArrayElement(descriptions),
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

const advetismentGenerator = new Array(10).fill(null).map(createAdvertisement);


export {getAuthor, getLocation, getOffer, advetismentGenerator};
