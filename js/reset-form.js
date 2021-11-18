import { resetMap } from './map.js';
import { PRICE_PLACEHOLDER, Price } from './settings.js';
import {mapFiltersForm, userForm, priceInputElement} from './selectors.js';


/**
 * Функция сбрасывающая ВСЁ в исходное(пустое) состояние
 */
const resetForm  = () => {
  mapFiltersForm.reset();
  userForm.reset();
  priceInputElement.placeholder = PRICE_PLACEHOLDER;
  priceInputElement.min = Price.flat;
  resetMap();
};

export{resetForm};
