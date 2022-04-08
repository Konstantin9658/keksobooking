import {TOKYO_LOCATION, mapMarker} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const COORDINATE_PRECISION = 5;
const MAX_NUMBER_OF_ROOMS = 100;
const NOT_FOR_GUESTS = 0;
const OfferMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const titleField = adForm.querySelector('#title');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const checkinField = adForm.querySelector('#timein');
const checkoutField= adForm.querySelector('#timeout');
const timeField = adForm.querySelector('.ad-form__element--time');
const roomsField = adForm.querySelector('#room_number');
const guestsField = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

// Блокируем форму и элементы формы
const setFormEnabled = (form, elements, enabled) => {
  if (enabled) {
    form.classList.remove('ad-form--disabled');
    for (const element of elements) {
      element.removeAttribute('disabled', 'disabled');
    }
  } else {
    form.classList.add('ad-form--disabled');
    for (const element of elements) {
      element.setAttribute('disabled', 'disabled');
    }
  }
};

const setAdFormEnabled = (enabled) => {
  setFormEnabled(adForm, adFormElements, enabled);
};

const validateRoomsAndGuests = () => {
  const roomsSelected = parseInt(roomsField.value, 10);
  const guestsSelected = parseInt(guestsField.value, 10);

  if (roomsSelected === MAX_NUMBER_OF_ROOMS && guestsSelected !== NOT_FOR_GUESTS) {
    guestsField.setCustomValidity(`Помещение на ${MAX_NUMBER_OF_ROOMS} комнат — не для гостей`);
  } else if (roomsSelected !== MAX_NUMBER_OF_ROOMS && guestsSelected === NOT_FOR_GUESTS) {
    guestsField.setCustomValidity('Помещение как минимум для одного гостя');
  }  else if (guestsSelected > roomsSelected) {
    guestsField.setCustomValidity('Гостей не может быть больше чем комнат!');
  } else {
    guestsField.setCustomValidity('');
  }
  guestsField.reportValidity();
};

const onRoomsOrGuestsChanged = () => validateRoomsAndGuests();

roomsField.addEventListener('change', onRoomsOrGuestsChanged);
guestsField.addEventListener('change', onRoomsOrGuestsChanged);

const onCheckInOutValueChange = (evt) => {
  const newValue = evt.target.value;
  checkinField.value = newValue;
  checkoutField.value = newValue;
};

timeField.addEventListener('change', onCheckInOutValueChange);

// Валидируем заголовок объявления
titleField.addEventListener('input', () => {
  const titleLength = titleField.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    titleField.setCustomValidity(`Минимум: ${MIN_TITLE_LENGTH} символов. Введите еще ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    titleField.setCustomValidity(`Максимум: ${MAX_TITLE_LENGTH} символов. Удалите ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleField.setCustomValidity('');
  }
  titleField.reportValidity();
});

// Валидируем адрес объявления
addressField.addEventListener('invalid', () => {
  addressField.setCustomValidity(addressField.validity.valueMissing ? 'Обязательное поле для заполнения!' : '');
});

// Меняем минимальную допустимую цену на апартаменты, в зависимости от выбранного типа жилья
typeField.addEventListener('change', () => {
  priceField.placeholder = OfferMinPrice[typeField.value.toUpperCase()];
  priceField.min = OfferMinPrice[typeField.value.toUpperCase()];
});

const getCoordinatesFromMarker = () => `${mapMarker.getLatLng().lat}, ${mapMarker.getLatLng().lng}`;

const truncCoordinate = (coordinate) => Number(coordinate.toFixed(COORDINATE_PRECISION));

const formatCoordinates = ({lat, lng}) => `${truncCoordinate(lat)}, ${truncCoordinate(lng)}`;

// Заполняем поле адреса
addressField.value = getCoordinatesFromMarker();

mapMarker.on('moveend', (evt) => {
  const coordinateValues = evt.target.getLatLng();
  addressField.value = formatCoordinates(coordinateValues);
});

const resetForm = () => {
  adForm.reset();
  mapMarker.setLatLng(TOKYO_LOCATION);
  addressField.value = getCoordinatesFromMarker();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    onSuccess(new FormData(evt.target));
  });
};

export {setFormEnabled, setAdFormEnabled, setUserFormSubmit, resetForm};
