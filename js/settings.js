export const PRICE_PLACEHOLDER = '1000';
export const Price = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

export const LOW_LIMIT = 10000;
export const HIGH_LIMIT = 50000;

export const PriceRanges = {
  low: (element) => element.offer.price < LOW_LIMIT,
  middle: (element) => element.offer.price >= LOW_LIMIT && element.offer.price < HIGH_LIMIT,
  high: (element) => element.offer.price >= HIGH_LIMIT,
};

export const INITIAL_MAP_COORD = {
  lat: 35.65000,
  lng: 139.70000,
};
export const MAIN_PIN_COORD = {
  lat: 35.70580,
  lng: 139.75420,
};
export const MAP_SCALE = 12;

export const MAIN_PIN_ICON_SIZE = [52, 52];
export const MAIN_PIN_ANCHOR = [26, 52];
export const PIN_ICON_SIZE = [40, 40];
export const PIN_ANCHOR = [20, 40];
export const BASE_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map';
export const ICON_URL = `${BASE_URL}/pin.svg`;
export const MAIN_PIN_ICON_URL = `${BASE_URL}/main-pin.svg`;

export const ESC = 'Esc';
export const ESCAPE = 'Escape';

export const RoomsCapacity = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3','2','1'],
  '100': [],
};

export const MAX_MARKER_COUNT = 10;
