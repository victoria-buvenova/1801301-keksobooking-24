import {
  initMap, putMarkers
} from './map.js';
import {
  disablePage,
  enableAdForm,
  enableFilterForm,
  handleMarkerMoved
} from './form-state.js';
import {
  fetchAds
} from './fetch.js';
import {
  initAdForm
} from './validation-form.js';
import {
  degradeFilter,
  initFilterForm,
  syncFilter
} from './filter-form.js';

const buffer = {
  data: null,
};
disablePage(document);

const startApp = async () => {
  try {
    buffer.data = await fetchAds();
    enableFilterForm();
    syncFilter();
  } catch (err) {
    degradeFilter();
    window.console.log(err);
  }
};

initFilterForm(buffer, putMarkers);
initAdForm();

initMap(
  async () => {
    enableAdForm();
    await startApp();
  },
  handleMarkerMoved,
);
