import {renderAdvertMarkers} from './map.js';
import {debounce} from './util.js';

const MAX_ADS = 10;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const FILTER_DELAY = 500;

const mapForm = document.querySelector('.map__filters');
const typeFilter = mapForm.querySelector('#housing-type');
const priceFilter = mapForm.querySelector('#housing-price');
const roomsFilter = mapForm.querySelector('#housing-rooms');
const guestsFilter = mapForm.querySelector('#housing-guests');
const mapFeatures = mapForm.querySelector('.map__features');
const featureFilters = mapFeatures.querySelectorAll('.map__checkbox');

const isAnyFilterValue = (filter) => filter.value === 'any';

const isAdTypeMatched = (advert) => isAnyFilterValue(typeFilter) || advert.offer.type === typeFilter.value;

const isAdPriceMatched = (advert) => {
  if (isAnyFilterValue(priceFilter)) {
    return true;
  }
  switch (priceFilter.value) {
    case 'low' : return advert.offer.price <= MIN_PRICE;
    case 'middle' : return advert.offer.price >= MIN_PRICE && advert.offer.price <= MAX_PRICE;
    case 'high' : return advert.offer.price >= MAX_PRICE;
    default : return false;
  }
};

const isAdNumberOfRoomsMatched = (advert) => isAnyFilterValue(roomsFilter) || advert.offer.rooms === parseInt(roomsFilter.value, 10);

const isAdNumberOfGuestsMatched = (advert) => isAnyFilterValue(guestsFilter) || advert.offer.guests === parseInt(guestsFilter.value, 10);

const isAdFeaturesMatched = (advert) => {
  const adFeatures = advert.offer.features || [];
  for (const filterFeature of featureFilters) {
    if (filterFeature.checked && !adFeatures.includes(filterFeature.value)) {
      return false;
    }
  }
  return true;
};

const filters = [
  isAdTypeMatched,
  isAdPriceMatched,
  isAdNumberOfRoomsMatched,
  isAdNumberOfGuestsMatched,
  isAdFeaturesMatched,
];

const isAdMatch = (advert) => filters.every((filter) => filter(advert));

const filterAds = (adverts) => {
  const filteredAds = [];
  for (let i = 0; i < adverts.length && filteredAds.length < MAX_ADS; i++) {
    const advert = adverts[i];
    if (isAdMatch(advert)) {
      filteredAds.push(advert);
    }
  }
  return filteredAds;
};

const createFilterDelay = (adverts) => debounce(() => renderAdvertMarkers(filterAds(adverts)), FILTER_DELAY);

const setListenerChangesInFilter = (adverts) => {
  const filterChangeHandler = createFilterDelay(adverts);

  typeFilter.addEventListener('change', filterChangeHandler);
  priceFilter.addEventListener('change', filterChangeHandler);
  roomsFilter.addEventListener('change', filterChangeHandler);
  guestsFilter.addEventListener('change', filterChangeHandler);
  mapFeatures.addEventListener('change', filterChangeHandler);
};

export {setListenerChangesInFilter, filterAds};
