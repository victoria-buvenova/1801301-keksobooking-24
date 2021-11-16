const DisplayedType = {
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

  const cardTemplate = document.querySelector('#card').content;
  const popup = cardTemplate.querySelector('.popup').cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  const popupAddress = popup.querySelector('.popup__text--address');
  const popupPrice = popup.querySelector('.popup__text--price');
  const popupType = popup.querySelector('.popup__type');
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const popupTime = popup.querySelector('.popup__text--time');
  const popupFeatures = popup.querySelector('.popup__features');
  const popupDescription = popup.querySelector('.popup__description');
  const popupPhotos = popup.querySelector('.popup__photos');
  const popupAvatar = popup.querySelector('.popup__avatar');

  offer.title ? addText(popupTitle, offer.title) : hideElement(popupTitle);

  hideElement(popupAddress);

  offer.price ? addText(popupPrice, `${offer.price} ₽/ночь`) : hideElement(popupPrice);

  offer.type ? addText(popupType, DisplayedType[offer.type]) : hideElement(popupType);

  (offer.rooms && offer.guests) ? addText(popupCapacity, handleCapacity(offer.guests, offer.rooms)) : hideElement(popupCapacity);

  (offer.checkin && offer.checkout) ? addText(popupTime, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`) : hideElement(popupTime);

  (Array.isArray(offer.features) &&  offer.features.length > 0) ? makePopupFeatures(popupFeatures, offer.features) : hideElement(popupFeatures);

  offer.description ? addText(popupDescription, offer.description) : hideElement(popupDescription);

  (Array.isArray(offer.photos) && offer.photos.length > 0) ? makePopupPhotos(popupPhotos, offer.photos) : hideElement(popupPhotos);

  author.avatar ? popupAvatar.src = author.avatar : hideElement(popupAvatar);

  return popup;

};


export {createPopup};

