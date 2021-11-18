import { PriceRanges, MAX_MARKER_COUNT } from '../settings.js';

const mapFiltersForm = document.querySelector('.map__filters');


const EMPTY_VALUE = 'any';


const applyPriceRangeRule = (element, priceRange) => !(priceRange in PriceRanges) || PriceRanges[priceRange](element);

const applyFeaturesRule = (element, features) => {
  if (!Array.isArray(features) || features.length <= 0) {
    return true; //пользователь не выбрал никаких фич в фильтре - значит забираем с собой
  }
  const {
    features: elementFeatures,
  } = element.offer;

  return features.every((filterFeature) => {
    if (!Array.isArray(elementFeatures) || elementFeatures.length <=0) {
      return false;
    }
    return elementFeatures.some((offerFeature) => filterFeature === offerFeature);
  });
};

const applyAccommodationTypesRule = (element, type) => {
  if (type === EMPTY_VALUE) {
    return true;
  }
  return type === element.offer.type;
};

const applyRoomsRule = (element, roomsValue) => {
  if (roomsValue !== EMPTY_VALUE) {
    return element.offer.rooms === Number(roomsValue);
  }
  return true;
};

const applyGuestsRule = (element, guestsValue) => {
  if (guestsValue !== EMPTY_VALUE) {
    return element.offer.guests === Number(guestsValue);
  }
  return true;
};

const getFiltered = (dataArr, priceRange, features, type, roomsValue, guestsValue) => {
  if (!Array.isArray(dataArr)) {
    return dataArr;
  }
  return dataArr
    .filter((element) =>
      applyPriceRangeRule(element, priceRange) &&
      applyFeaturesRule(element, features) &&
      applyAccommodationTypesRule(element, type) &&
      applyRoomsRule(element, roomsValue) &&
      applyGuestsRule(element, guestsValue))
    .slice(0, MAX_MARKER_COUNT);
};
const isChecked = (a) => a.checked;
const getValue = (b) => b.value;
const getCheckedFilters = (filterFeatures2) => [...filterFeatures2].filter(isChecked).map(getValue);

const createFilterFunction = (form) => {
  const filterPriceInput = form.querySelector('#housing-price');
  const filterTypeInput = form.querySelector('#housing-type');
  const filterRoomsInput = form.querySelector('#housing-rooms');
  const filterGuestsInput = form.querySelector('#housing-guests');
  const filterFeatures = form.querySelectorAll('.map__checkbox');
  return (offersArr) => getFiltered(offersArr,
    filterPriceInput.value,
    getCheckedFilters(filterFeatures),
    filterTypeInput.value,
    filterRoomsInput.value,
    filterGuestsInput.value);
};

const attachFiltersChangeHandler = (form, callback) => {
  form.addEventListener('change', callback);
};

const resetFilter = () => {
  mapFiltersForm.reset();
};

export {
  createFilterFunction,
  attachFiltersChangeHandler,
  resetFilter
};

