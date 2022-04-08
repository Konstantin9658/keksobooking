const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.popup');

const getOfferTypeName = (offerType) => {
  switch (offerType) {
    case 'flat': return 'Квартира';
    case 'bungalow' : return 'Бунгало';
    case 'house' : return 'Дом';
    case 'palace' : return 'Дворец';
    case 'hotel' : return 'Отель';
  }
};

const updateFeatures = (popupElement, features) => {
  const popupFeaturesList = popupElement.querySelector('.popup__features');
  const popupFeatures = popupFeaturesList.children;
  if (!features) {
    // Скрываем блок с фичами, если их нет вообще
    return popupFeaturesList.classList.add('hidden');
  }
  for (const popupFeature of popupFeatures) {
    popupFeature.classList.add('hidden');
    for (const feature of features) {
      // Проверяем на наличие нужного модификатора
      if (popupFeature.classList.contains(`popup__feature--${feature}`)) {
        popupFeature.classList.remove('hidden');
      }
    }
  }
};

const updatePhotos = (popupElement, photos) => {
  const popupPhotosList = popupElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotosList.querySelector('.popup__photo');
  if (!photos) {
    // Скрываем блок с фото, если их нет
    return popupPhotosList.classList.add('hidden');
  }
  for (const photo of photos) {
    const userPhoto = popupPhoto.cloneNode(false);
    popupPhoto.remove();
    userPhoto.src = photo;
    popupPhotosList.appendChild(userPhoto);
  }
};

const showPopup = (advert) => {
  const popupElement = card.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = advert.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = getOfferTypeName(advert.offer.type);
  popupElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  updateFeatures(popupElement, advert.offer.features);
  popupElement.querySelector('.popup__description').textContent = advert.offer.description;
  updatePhotos(popupElement, advert.offer.photos);
  popupElement.querySelector('.popup__avatar').src = advert.author.avatar;

  return popupElement;
};

export {showPopup};
