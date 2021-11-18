const mapFiltersForm = document.querySelector('.map__filters');

const LOW_LIMIT = 10000;
const HIGH_LIMIT = 50000;

const EMPTY_VALUE = 'any';

const priceRanges = {
  low: (element) => element.offer.price < LOW_LIMIT,
  middle: (element) => element.offer.price >= LOW_LIMIT && element.offer.price < HIGH_LIMIT,
  high: (element) => element.offer.price >= HIGH_LIMIT,
};

const applyPriceRangeRule = (element, priceRange) => !(priceRange in priceRanges) || priceRanges[priceRange](element);

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

const applyAccomodationTypesRule = (element, type) => {
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
      applyAccomodationTypesRule(element, type) &&
      applyRoomsRule(element, roomsValue) &&
      applyGuestsRule(element, guestsValue))
    .slice(0, 10);
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

