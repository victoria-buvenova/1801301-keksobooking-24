import {createPopup} from './card.js';
import {fetchAds} from './fetch.js';
import {enablePage} from './form-state.js';
import { attachFiltersChangeHandler } from './utils/filters.js';
import {
  MAIN_PIN_ANCHOR,
  MAIN_PIN_ICON_SIZE,
  MAIN_PIN_ICON_URL,
  MAP_SCALE,
  PIN_ICON_SIZE,
  PIN_ANCHOR,
  ICON_URL,
  MAIN_PIN_COORD,
  INITIAL_MAP_COORD
} from './settings.js';
import {addressInput} from './selectors.js';

let map = null;
const initMap = () => {

  map = L.map('map-canvas')
    .on('load', () => {
      // перевод страницы в активное состояние после инициализации формы
      enablePage(document);
    })
    .setView({
      lat: INITIAL_MAP_COORD.lat,
      lng: INITIAL_MAP_COORD.lng,
    }, MAP_SCALE);


  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: MAIN_PIN_ICON_URL,
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
    addressInput.value = `${mainPinCoord.lat.toFixed(5)}, ${mainPinCoord.lng.toFixed(5)}`;
  });

  const markerGroup = L.layerGroup().addTo(map);

  /**
 * Функция для очистки существующих на карте меток(пинов)
 */
  const clearMarkerGroup = () => {
    markerGroup.clearLayers();
  };

  const showAds = createShowAds(document.querySelector('.map__filters'));

  const loadAds = fetchAds(showAds, (err) => window.console.error (err));
};
const createShowAds = (form) => {
  const filterFunction = createFilterFunction(form);
  let adsArray = null;
  let layer = null;
  const result = () => {
    if (adsArray === null) {
      return;
    }

    if (layer !== null) {
      clearMarkerGroup();
    }
    filterFunction(adsArray).slice(0, 10).forEach((listedProperty) => {
      const icon = L.icon({
        iconUrl: ICON_URL,
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

      layer = marker;

      marker
        .addTo(markerGroup)
        .bindPopup(createPopup(listedProperty.offer, listedProperty.author),{keepInView: true});
    });
  };

  attachFiltersChangeHandler(form, result);
  return (data) => {
    adsArray = data;
    result();
  };
};
/**
 * Функция возвращающая форму в изначальное состояние
 * закрывает откртый Popup
 * отображает начальное положение формы и главного маркера
 */
const resetMap = () => {
  if (map === null) {
    return;
  }

  loadAds();
  map.setView({
    lat: INITIAL_MAP_COORD.lat,
    lng: INITIAL_MAP_COORD.lng,
  }, MAP_SCALE);
  map.closePopup();
  mainPinMarker.setLatLng({
    lat: MAIN_PIN_COORD.lat,
    lng: MAIN_PIN_COORD.lng,
  });
  addressInput.value = `${MAIN_PIN_COORD.lat}, ${MAIN_PIN_COORD.lng}`;
};

loadAds();

export {resetMap, initMap};
