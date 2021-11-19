import { addressInput, adForm, mapFiltersForm, priceInputElement } from './selectors.js';
import { MAIN_PIN_COORD, Price, PRICE_PLACEHOLDER } from './settings.js';
import { formatAddress } from './utils.js';

const settings = {
  active: {
    method: 'remove',
    attribute: (element) => {
      element.removeAttribute('disabled');
      if(element.type === 'checkbox'){
        element.checked = false;
      }
    },
  },
  disabled: {
    method: 'add',
    attribute: (element) => element.setAttribute('disabled', 'disabled'),
  },
};
const setFormState = (form, state) => {
  form.classList[state.method]('ad-form--disabled');
  [...form.elements].forEach(state.attribute);
  form.reset();
};

const setSpecialControlState = ()=>{
  addressInput.readOnly = true;
  addressInput.value = formatAddress(MAIN_PIN_COORD);
  priceInputElement.placeholder = PRICE_PLACEHOLDER;
  priceInputElement.min = Price.flat;
};

const disablePage = (document) => [...document.forms].forEach((form) => setFormState(form, settings.disabled));

const enableFilterForm = ()=>{
  setFormState(mapFiltersForm, settings.active);
};

const enableAdForm = ()=>{
  setFormState(adForm,settings.active);
  setSpecialControlState();
};

const handleMarkerMoved = ({lat,lng})=> addressInput.value = formatAddress({lat,lng});

export {disablePage, enableFilterForm, enableAdForm, handleMarkerMoved};
