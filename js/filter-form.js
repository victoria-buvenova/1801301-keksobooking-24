import { createFilterFunction } from './utils/filters.js';
import {mapFiltersForm} from './selectors.js';
import { NO_DATA_TO_FILTER } from './settings.js';
import {debounce} from './utils/debounce.js';

let _buffer = null;
let _putMarkers = null;

let _filterFunc = null;

export const syncFilter = ()=>{
  if(_buffer === null){
    return;
  }
  if(typeof _putMarkers !== 'function'){
    return;
  }
  const {data} = _buffer;
  if(!Array.isArray(data)){
    throw new Error();
  }
  _putMarkers(_filterFunc(data));
};

const debounceSyncFilter = debounce(syncFilter,500);

export const initFilterForm = (buffer, putMarkers)=>{
  if(_buffer !== null){
    return;
  }
  if(typeof buffer !== 'object' || buffer === null){
    throw new Error();
  }
  if(typeof putMarkers !== 'function'){
    throw new Error();
  }
  _buffer = buffer;
  _putMarkers = putMarkers;
  _filterFunc = createFilterFunction(mapFiltersForm);
  mapFiltersForm.addEventListener('change',debounceSyncFilter);
  mapFiltersForm.querySelector('.map__features',debounceSyncFilter);
};

export const degradeFilter = ()=>{
  const div = document.createElement('div');
  div.className = 'map-filter__no-data';
  div.innerText = NO_DATA_TO_FILTER;
  mapFiltersForm.parentElement.appendChild(div);
};
