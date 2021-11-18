import {
  createPopup
} from './card.js';
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
import {
  addressInput
} from './selectors.js';
import { formatAddress } from './utils.js';

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_URL,
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

let map = null;
let mainPinMarker = null;
let markerGroup = null;

const initMapAttribution = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
};

const initPinMarker = (onPinMoved)=>{
  mainPinMarker = L.marker({
    lat: MAIN_PIN_COORD.lat,
    lng: MAIN_PIN_COORD.lng,
  }, {
    draggable: true,
    icon: mainPinIcon,
  } );

  mainPinMarker.on('moveend', (evt) => onPinMoved(evt.target.getLatLng()));
  mainPinMarker.addTo(map);
};

const initOffersLayer  = ()=>{
  markerGroup = L.layerGroup().addTo(map);
};

const prepareMarker = (listedProperty) => {
  const icon = L.icon({
    iconUrl: ICON_URL,
    iconSize: PIN_ICON_SIZE,
    iconAnchor: PIN_ANCHOR,
  });

  const marker = L.marker({
    lat: listedProperty.location.lat,
    lng: listedProperty.location.lng,
  }, {
    icon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(listedProperty.offer, listedProperty.author), {
      keepInView: true,
    });
};

const clearMarkerGroup = () => {
  if (markerGroup === null) {
    return;
  }
  markerGroup.clearLayers();
};

export const initMap = (onMapLoad, onPinMoved) => {

  if (map !== null) {
    return;
  }
  if(typeof onMapLoad !== 'function'){
    throw new Error('onMapLoad expected');
  }
  if(typeof onPinMoved !== 'function'){
    throw new Error('onPinMoved expected');
  }

  map = L.map('map-canvas')
    .on('load', onMapLoad)
    .setView(INITIAL_MAP_COORD, MAP_SCALE);

  initMapAttribution();

  initPinMarker(onPinMoved);

  initOffersLayer();
};

export const resetMap = () => {
  if (map === null) {
    return;
  }
  clearMarkerGroup();
  map.setView(INITIAL_MAP_COORD, MAP_SCALE);
  map.closePopup();
  mainPinMarker.setLatLng(MAIN_PIN_COORD);
  addressInput.value = formatAddress(MAIN_PIN_COORD);
};

export const putMarkers = (data)=>{
  if(map === null){
    throw new Error('please init map');
  }
  if(!Array.isArray(data)){
    return;
  }
  clearMarkerGroup();
  data.forEach(prepareMarker);
};
