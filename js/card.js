const DISPLAYED_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом' ,
  palace: 'Дворец',
  hotel: 'Отель',
};


/**
 * скрывает элемент, добавляя класс hidden
 * @param {*} element элемент, который нужно скрыть
 */
function hideElement(element) {
  if (element) {
    element.classList.add('hidden');
  }
}

/**
 * добавляет необх-й текст в свойство textContent элемента
 * @param {*} element элемент, текст в котором нужно поменять/добавить
 * @param {*} displayedText текст, используемый для замены/добавления
 */
function addText(element, displayedText) {
  if (element && displayedText) {
    element.textContent = displayedText;
  }
}

/**
 * отображает правильные окончания
 * @param {*} guestNumber число гостей
 * @param {*} roomNumber число комнат
 * @returns строку с правильнымы окончаниями для гостей и комнат
 */
function handleCapacity(guestNumber, roomNumber) {
  let displayedGuest = 'гостей';
  let displayedRoom = 'комнат';

  if (guestNumber === 1) {
    displayedGuest = 'гостя';
  }

  if (roomNumber === 1) {
    displayedRoom = 'комната';
  }

  if (roomNumber > 1 && roomNumber < 5) {
    displayedRoom = 'комнаты';
  }
  return `${roomNumber} ${displayedRoom} для ${guestNumber} ${displayedGuest}`;
}
/**
 * отображает массивы фотографий
 * @param {*} popupElement элемент, в котором отображаем фото
 * @param {*} photos массив фото для отображений
 */
function makePopupPhotos(popupElement, photos) {
  const popupPhoto = popupElement.querySelector('.popup__photo');
  const popupPhotoClone = popupPhoto.cloneNode(true);
  popupPhoto.remove();

  photos.forEach((photoSrc) => {
    const photo = popupPhotoClone.cloneNode(true);
    photo.src = photoSrc;
    popupElement.appendChild(photo);
  });
}

/**
 * отображает список features
 * @param {*} popupElement элемент, в котором отображаем features
 * @param {*} features массив features для отображений
 */
function makePopupFeatures(popupElement, features) {
  popupElement.innerHTML='';
  features.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    popupElement.appendChild(newFeature);
  });

}

/**
 * функция, создающая попап(карточку)
 * @param {} offer
 * @param {*} author
 * @returns возвращает попап с данными
 */
const createPopup = (offer, author) => {

  const CARD_TEMPLATE = document.querySelector('#card').content;
  const POPUP = CARD_TEMPLATE.querySelector('.popup').cloneNode(true);

  const POPUP_TITLE = POPUP.querySelector('.popup__title');
  const POPUP_ADDRESS = POPUP.querySelector('.popup__text--address');
  const POPUP_PRICE = POPUP.querySelector('.popup__text--price');
  const POPUP_TYPE = POPUP.querySelector('.popup__type');
  const POPUP_CAPACITY = POPUP.querySelector('.popup__text--capacity');
  const POPUP_TIME = POPUP.querySelector('.popup__text--time');
  const POPUP_FEATURES = POPUP.querySelector('.popup__features');
  const POPUP_DESCRIPTION = POPUP.querySelector('.popup__description');
  const POPUP_PHOTOS = POPUP.querySelector('.popup__photos');
  const POPUP_AVATAR = POPUP.querySelector('.popup__avatar');

  offer.title ? addText(POPUP_TITLE, offer.title) : hideElement(POPUP_TITLE);

  hideElement(POPUP_ADDRESS);

  offer.price ? addText(POPUP_PRICE, `${offer.price} ₽/ночь`) : hideElement(POPUP_PRICE);

  offer.type ? addText(POPUP_TYPE, DISPLAYED_TYPE[offer.type]) : hideElement(POPUP_TYPE);

  (offer.rooms && offer.guests) ? addText(POPUP_CAPACITY, handleCapacity(offer.guests, offer.rooms)) : hideElement(POPUP_CAPACITY);

  (offer.checkin && offer.checkout) ? addText(POPUP_TIME, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`) : hideElement(POPUP_TIME);

  (Array.isArray(offer.features) &&  offer.features.length > 0) ? makePopupFeatures(POPUP_FEATURES, offer.features) : hideElement(POPUP_FEATURES);

  offer.description ? addText(POPUP_DESCRIPTION, offer.description) : hideElement(POPUP_DESCRIPTION);

  (Array.isArray(offer.photos) && offer.photos.length > 0) ? makePopupPhotos(POPUP_PHOTOS, offer.photos) : hideElement(POPUP_PHOTOS);

  author.avatar ? POPUP_AVATAR.src = author.avatar : hideElement(POPUP_AVATAR);

  return POPUP;

};


export {createPopup};

