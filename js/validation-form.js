const userForm = document.querySelector('.ad-form');
const accommodationTypeInputElement = userForm.querySelector('#type');
const priceInputElement = userForm.querySelector('#price');
const checkInInput = document.querySelector('#timein');
const checkOutInput = document.querySelector('#timeout');

const ROOMS = {
  one: '1',
  two: '2',
  three: '3',
  hundred: '100',
};

const PRICE = {
  min: 0,
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
/**
 * показывает минимальную цену в зависимости от типа жилья
 * @param {*} accommodationType тип жилья
 * @returns минимальную цену
 */
function getMinPrice(accommodationType) {
  let minPrice;
  switch (accommodationType) {
    case 'bungalow':
      minPrice = PRICE.bungalow;
      break;
    case 'flat':
      minPrice = PRICE.flat;
      break;
    case 'hotel':
      minPrice = PRICE.hotel;
      break;
    case 'house':
      minPrice = PRICE.house;
      break;
    case 'palace':
      minPrice = PRICE.palace;
      break;
    default: minPrice = PRICE.min;
  }
  return minPrice;
}

/**
 * вызывает getMinPrice с типом жилья, выбранного из списка
 * и меняет значения цены в зависимости от выбранного типа жилья
 */
const calculateRoomsCapacity = () => {
  const price = getMinPrice(accommodationTypeInputElement.value);
  priceInputElement.value = price;
};

accommodationTypeInputElement.addEventListener('change', calculateRoomsCapacity);

const capacitySelect = document.querySelector('#capacity');
const capacityOption = capacitySelect.querySelectorAll('option');

const roomNumberSelect = document.querySelector('#room_number');

roomNumberSelect.addEventListener('change', () => {
  if (roomNumberSelect.value === ROOMS.hundred) {
    capacityOption[3].disabled = false;
    capacityOption[3].selected = true;
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled = true;
  } else if (roomNumberSelect.value === ROOMS.one) {
    capacityOption[0].disabled = true;
    capacityOption[2].selected = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled = false;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === ROOMS.two) {
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = false;
    capacityOption[1].selected = true;
    capacityOption[2].disabled = false;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === ROOMS.three) {
    capacityOption[0].disabled = false;
    capacityOption[0].selected = true;
    capacityOption[1].disabled = false;
    capacityOption[2].disabled = false;
    capacityOption[3].disabled = true;
  }
});

/**
 * сопоставляет время въезда/выезда
 */
const matchTime = () => {
  checkOutInput.value = checkInInput.value;
};

checkInInput.addEventListener('change', matchTime);

const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = document.querySelectorAll('.map__filter');

/**
 * функция переключает форму в активное или неактивное состояние
 * @param {*} activeState булево значение, отвечающее за активное/неактивное состояние
 */
const toggleFormState = (activeState) => {
  if (activeState) {
    adForm.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('map__filters--disabled');
    adFormElements.forEach((formElement) => {
      formElement.removeAttribute('disabled');
    });
    mapFiltersFormElements.forEach((filterElement) => {
      filterElement.removeAttribute('disabled');
    });
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFiltersForm.classList.add('map__filters--disabled');
    adFormElements.forEach((formElement) => {
      formElement.setAttribute('disabled', 'disabled');
    });
    mapFiltersFormElements.forEach((filterElement) => {
      filterElement.setAttribute('disabled', 'disabled');
    });
  }
};

export {toggleFormState};
