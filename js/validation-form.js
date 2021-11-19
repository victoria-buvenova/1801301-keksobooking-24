import { postAd } from './fetch.js';
import { ESC, ESCAPE, Price, RoomsCapacity } from './settings.js';
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
  priceInputElement,
  typeSelect
} from './selectors.js';
import { enableAdForm, enableFilterForm } from './form-state.js';
import { resetMap } from './map.js';
import { syncFilter } from './filter-form.js';

const formResetBtn = userForm.querySelector('.ad-form__reset');

const syncSelectValue = (primary, secondary) => secondary.value = primary.value;

const isCapacityValid = ()=>{
  const enabled = [...capacitySelect.options].find((e)=>e.value === capacitySelect.value && e.disabled === false);
  return typeof enabled !== 'undefined';
};

const syncRoomsCapacity = ()=>{
  const guests = RoomsCapacity[roomNumberSelect.value];
  [...capacitySelect.options].forEach((option)=>option.disabled = guests.every((capacity)=>capacity !== option.value));
  capacitySelect.setCustomValidity(isCapacityValid()?'':'capacity is invalid');
};

const syncTypePrice = ()=>{
  const min = Price[typeSelect.value];
  priceInputElement.placeholder = min;
  priceInputElement.min = min;
};

const initFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    postAd (
      new FormData(evt.target),
      onSuccess,
      onFail,
    );
  });
};

const handleClonedMessage = (clonedElement, onClose=()=>undefined)=>{
  body.appendChild(clonedElement);
  let handleEsc = null;
  let handleX = null;
  const handleClose = ()=>{
    body.removeChild(clonedElement);
    document.removeEventListener('keydown', handleEsc);
    clonedElement.removeEventListener('click', handleX);
    onClose();
  };
  handleEsc = (evt) => {
    if (evt.key === ESC || evt.key === ESCAPE) {
      handleClose();
    }
  };
  handleX = () => {
    handleClose();
  };
  clonedElement.addEventListener('click', handleX);

  document.addEventListener('keydown', handleEsc);
};
const resetPage = ()=>{
  enableAdForm();
  enableFilterForm();
  resetMap();
  syncFilter();
};
const onFormSuccess = () => {
  handleClonedMessage(successTemplate.querySelector('.success').cloneNode(true),resetPage);
};

const onFormFail = () => {
  handleClonedMessage(errorTemplate.querySelector('.error').cloneNode(true));
};
const initFormReset = ()=>{
  formResetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
  });
};

const initCheckInCheckOut = ()=>{
  checkInInput.addEventListener('change',()=>syncSelectValue(checkInInput, checkOutInput));
  checkOutInput.addEventListener('change',()=>syncSelectValue(checkOutInput, checkInInput));
  syncSelectValue(checkInInput, checkOutInput);
};


const initRooms = ()=>{
  roomNumberSelect.addEventListener('change',syncRoomsCapacity);
  syncRoomsCapacity();
};

const initType = ()=>{
  typeSelect.addEventListener('change', syncTypePrice);
  syncTypePrice();
};

export const initAdForm = ()=>{
  initFormSubmit(onFormSuccess,onFormFail);
  initFormReset();
  initCheckInCheckOut();
  initRooms();
  initType();
};
