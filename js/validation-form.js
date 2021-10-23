const userForm = document.querySelector('.ad-form');
const accommodationTypeInputElement = userForm.querySelector('#type');
const priceInputElement = userForm.querySelector('#price');
const ONE_ROOM = '1';
const TWO_ROOMS = '2';
const THREE_ROOMS = '3';
const HUNDRED_ROOMS = '100';

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
  if (roomNumberSelect.value === HUNDRED_ROOMS) {
    capacityOption[3].disabled = false;
    capacityOption[3].selected = true;
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled = true;
  } else if (roomNumberSelect.value === ONE_ROOM) {
    capacityOption[0].disabled = true;
    capacityOption[2].selected = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled= false;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === TWO_ROOMS) {
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = false;
    capacityOption[2].disabled= false;
  } else if (roomNumberSelect.value === THREE_ROOMS) {
    capacityOption[0].disabled = false;
    capacityOption[1].disabled = false;
    capacityOption[2].disabled= false;
    capacityOption[3].disabled = true;
  }
});