import { postAd } from './fetch.js';
import { Price, Rooms } from './settings.js';
import {
  userForm,
  successTemplate,
  errorTemplate,
  capacitySelect,
  roomNumberSelect,
  checkInInput,
  checkOutInput,
  adForm,
  body,
  priceInputElement
} from './selectors.js';
import { resetForm} from './reset-form.js';

const ESC = 'Esc';
const ESCAPE = 'Escape';

const accommodationTypeInputElement = userForm.querySelector('#type');
const formResetBtn = userForm.querySelector('.ad-form__reset');
const formSubmitBtn = userForm.querySelector('.ad-form__submit');
const sucessMsg = successTemplate.querySelector('.success').cloneNode(true);
const errorMsg = errorTemplate.querySelector('.error').cloneNode(true);

/**
 * показывает минимальную цену в зависимости от типа жилья
 * @param {*} accommodationType тип жилья
 * @returns минимальную цену
 */
function getMinPrice(accommodationType) {
  let minPrice;
  switch (accommodationType) {
    case 'bungalow':
      minPrice = Price.bungalow;
      break;
    case 'flat':
      minPrice = Price.flat;
      break;
    case 'hotel':
      minPrice = Price.hotel;
      break;
    case 'house':
      minPrice = Price.house;
      break;
    case 'palace':
      minPrice = Price.palace;
      break;
    default: minPrice = Price.min;
  }
  return minPrice;
}

/**
 * вызывает getMinPrice с типом жилья, выбранного из списка
 * и меняет значения цены в зависимости от выбранного типа жилья
 */
const calculateRoomsCapacity = () => {
  const price = getMinPrice(accommodationTypeInputElement.value);
  priceInputElement.placeholder = price;
  priceInputElement.min = price;
};

accommodationTypeInputElement.addEventListener('change', calculateRoomsCapacity);

const capacityOption = capacitySelect.querySelectorAll('option');

roomNumberSelect.addEventListener('change', () => {
  if (roomNumberSelect.value === Rooms.hundred) {
    capacityOption[3].disabled = false;
    capacityOption[3].selected = true;
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled = true;
  } else if (roomNumberSelect.value === Rooms.one) {
    capacityOption[0].disabled = true;
    capacityOption[2].selected = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled = false;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === Rooms.two) {
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = false;
    capacityOption[1].selected = true;
    capacityOption[2].disabled = false;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === Rooms.three) {
    capacityOption[0].disabled = false;
    capacityOption[0].selected = true;
    capacityOption[1].disabled = false;
    capacityOption[2].disabled = false;
    capacityOption[3].disabled = true;
  }
});

// синхронизирует поля время заезда и время выезда

checkInInput.addEventListener('change', (evt) => {
  checkOutInput.value = evt.target.value;
});

checkOutInput.addEventListener('change', (evt) => {
  checkInInput.value = evt.target.value;
});

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


