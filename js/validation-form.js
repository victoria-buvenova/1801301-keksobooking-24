const userForm = document.querySelector('.ad-form');
const accommodationTypeInputElement = userForm.querySelector('#type');
const priceInputElement = userForm.querySelector('#price');

/**
 * показывает минимальную цену в зависимости от типа жилья
 * @param {*} accommodationType тип жилья
 * @returns минимальную цену
 */
function getMinPrice(accommodationType) {
  let minPrice;
  switch (accommodationType) {
    case 'bungalow':
      minPrice = 0;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'hotel':
      minPrice = 3000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
    default: minPrice = 0;
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
  if (roomNumberSelect.value === '100') {
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = true;
    capacityOption[2].disabled = true;
    capacityOption[3].selected = true;
  } else if (roomNumberSelect.value === '1') {
    capacityOption[0].disabled = true;
    capacityOption[1].disabled = true;
    capacityOption[2].selected= true;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === '2') {
    capacityOption[0].disabled = true;
    capacityOption[1].selected = true;
    capacityOption[2].selected= true;
    capacityOption[3].disabled = true;
  } else if (roomNumberSelect.value === '3') {
    capacityOption[0].selected = true;
    capacityOption[1].selected = true;
    capacityOption[2].selected= true;
    capacityOption[3].disabled = true;
  }
});
