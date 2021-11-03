import {createPopup} from './card.js';
import {advetismentGenerator} from './data.js';
import {toggleFormState} from './validation-form.js';

const INITIAL_MAP_COORD = {
  lat: 35.65000,
  lng: 139.70000,
};
const MAIN_PIN_COORD = {
  lat: 35.70580,
  lng: 139.75420,
};

const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const PIN_ICON_SIZE = [40, 40];
const PIN_ANCHOR = [20, 40];

const ADDRESS_INPUT = document.querySelector('#address');
document.getElementById('address').readOnly = true;
ADDRESS_INPUT.value = `${MAIN_PIN_COORD.lat}, ${MAIN_PIN_COORD.lng}`;

// перевод страницы в неактивное состояние
toggleFormState(false);

const map = L.map('map-canvas')
  .on('load', () => {
  // перевод страницы в активное состояние после инициализации формы
    toggleFormState(true);
  })
  .setView({
    lat: INITIAL_MAP_COORD.lat,
    lng: INITIAL_MAP_COORD.lng,
  }, 6);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_PIN_COORD.lat,
    lng: MAIN_PIN_COORD.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// отображает координаты главной метки в поле ввода после того как метка была передвинута
mainPinMarker.on('moveend', (evt) => {
  const mainPinCoord = evt.target.getLatLng();
  ADDRESS_INPUT.value = `${mainPinCoord.lat.toFixed(5)}, ${mainPinCoord.lng.toFixed(5)}`;
});

advetismentGenerator.forEach((listedProperty) => {
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: PIN_ICON_SIZE,
    iconAnchor: PIN_ANCHOR,
  });

  const marker = L.marker(
    {
      lat: listedProperty.location.lat,
      lng: listedProperty.location.lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createPopup(listedProperty.offer, listedProperty.author));
});
