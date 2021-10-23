import {getAuthor, getLocation, getOffer} from './data.js';
import './card.js';
import './validation-form.js';

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
