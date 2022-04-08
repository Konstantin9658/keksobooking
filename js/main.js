import './form.js';
import {resetForm, setAdFormEnabled, setUserFormSubmit} from './form.js';
import {setMapFormEnabled, initMap, showAdMarkers, updateMap} from './map.js';
import './status.js';
import {fetchAdverts, sendAdvert} from './api.js';
import { showErrorMessage, showSuccessMessage } from './status.js';

let adverts = [];

const setPageEnabled = (enabled) => {
  setAdFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

setPageEnabled(false);

initMap(() => {
  setPageEnabled(true);
  setUserFormSubmit((newAd) => {
    sendAdvert(newAd, () => {
      updateMap(adverts);
      resetForm();
      showSuccessMessage();
    }, showErrorMessage);
  });
  fetchAdverts((advertsFromServer) => {
    adverts = advertsFromServer;
    showAdMarkers(adverts);
  });
});


