import { postAd } from './fetch.js';
import { resetMap } from './map.js';

const userForm = document.querySelector('.ad-form');
const accommodationTypeInputElement = userForm.querySelector('#type');
const priceInputElement = userForm.querySelector('#price');
const checkInInput = document.querySelector('#timein');
const checkOutInput = document.querySelector('#timeout');
const formResetBtn = userForm.querySelector('.ad-form__reset');
const formSubmitBtn = userForm.querySelector('.ad-form__submit');

const body = document.querySelector('body');

const successTemplate = document.querySelector('#success').content;
const sucessMsg = successTemplate.querySelector('.success').cloneNode(true);

const errorTemplate = document.querySelector('#error').content;
const errorMsg = errorTemplate.querySelector('.error').cloneNode(true);

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
const mapFiltersForm = document.querySelector('.map__filters');


const onFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    postAd (
      new FormData(evt.target),
      onSuccess,
      onFail,
    );
  });
};

/**
 * Функция сбрасывающая ВСЁ в исходное(пустое) состояние
 */
const resetForm  = () => {
  mapFiltersForm.reset();
  userForm.reset();
  resetMap();
};

const ESC = 'Esc';
const ESCAPE = 'Escape';

/**
 * Функция вызываемая в случае успешного POST запроса
 * чистит поля формы
 * показывает Success Message overlay
 * при нажатии Esc(Escape) удаляются Success Message overlay и EventListener'ы
 */
const onFormSuccess = () => {
  resetForm();
  body.appendChild(sucessMsg);

  const onCloseSuccess = (evt) => {
    if (evt.key === ESC || evt.key === ESCAPE) {
      body.removeChild(sucessMsg);
      document.removeEventListener('keydown', onCloseSuccess);
    }
  };

  sucessMsg.addEventListener('click', () => {
    body.removeChild(sucessMsg);
    document.removeEventListener('keydown', onCloseSuccess);
  });

  document.addEventListener('keydown', onCloseSuccess);
};

/**
 * Функция вызываемая в случае НЕуспешного POST запроса
 * показывает Error Message overlay
 * при нажатии Esc(Escape) или кнопки "Попробуйте снова", удаляются Error Message overlay и EventListener'ы
 */
const onFormFail = () => {
  document.querySelector('body').appendChild(errorMsg);

  const onCloseError = (evt) => {
    if (evt.key === ESC || evt.key === ESCAPE) {
      body.removeChild(errorMsg);
      document.removeEventListener('keydown', onCloseError);
    }
  };

  errorMsg.addEventListener('click', () => {
    body.removeChild(errorMsg);
    document.removeEventListener('keydown', onCloseError);
  });

  document.addEventListener('keydown', onCloseError);

  const errorButton = errorTemplate.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    body.removeChild(errorMsg);
    document.removeEventListener('keydown', onCloseError);
  });
};

//Возврат формы в исходное состояние
formResetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

//Отправка формы
formSubmitBtn.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postAd (
    new FormData(evt.target),
    onFormSuccess,
    onFormFail,
  );
});


onFormSubmit(onFormSuccess, onFormFail);
