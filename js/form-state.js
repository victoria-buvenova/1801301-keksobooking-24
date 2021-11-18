import{resetForm} from './reset-form.js';
import { addressInput } from './selectors.js';
import { MAIN_PIN_COORD } from './settings.js';

const settings = {
  active: {
    method: 'remove',
    attribute: (element) => element.removeAttribute('disabled'),
  },
  disabled: {
    method: 'add',
    attribute: (element) => element.setAttribute('disabled', 'disabled'),
  },
};
const setFormState = (form, state) => {
  form.classList[state.method]('ad-form--disabled');
  [...form.elements].forEach(state.attribute);
};


const disablePage = (document) => [...document.forms].forEach((form) => setFormState(form, settings.disabled));

const enablePage = (document) => {
  [...document.forms].forEach((form) => setFormState(form, settings.active));
  resetForm();
  addressInput.readOnly = true;
  addressInput.value = `${MAIN_PIN_COORD.lat}, ${MAIN_PIN_COORD.lng}`;
};

export {disablePage, enablePage};
