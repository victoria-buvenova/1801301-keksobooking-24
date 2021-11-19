import { createFilterFunction } from './utils/filters.js';
import {mapFiltersForm} from './selectors.js';
import { NO_DATA_TO_FILTER } from './settings.js';
import {debounce} from './utils/debounce.js';

let bufferRef = null;
let putMarkersRef = null;

let filterFuncRef = null;

export const syncFilter = ()=>{
  if(bufferRef === null){
    return;
  }
  if(typeof putMarkersRef !== 'function'){
    return;
  }
  const {data} = bufferRef;
  if(!Array.isArray(data)){
    throw new Error();
  }
  putMarkersRef(filterFuncRef(data));
};

const debounceSyncFilter = debounce(syncFilter,500);

export const initFilterForm = (buffer, putMarkers)=>{
  if(bufferRef !== null){
    return;
  }
  if(typeof buffer !== 'object' || buffer === null){
    throw new Error();
  }
  if(typeof putMarkers !== 'function'){
    throw new Error();
  }
  bufferRef = buffer;
  putMarkersRef = putMarkers;
  filterFuncRef = createFilterFunction(mapFiltersForm);
  mapFiltersForm.addEventListener('change',debounceSyncFilter);
  mapFiltersForm.querySelector('.map__features',debounceSyncFilter);
};

export const degradeFilter = ()=>{
  const div = document.createElement('div');
  div.className = 'map-filter__no-data';
  div.innerText = NO_DATA_TO_FILTER;
  mapFiltersForm.parentElement.appendChild(div);
};
