import {showAlert} from './status.js';

const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';

const fetchAdverts = (onSuccess) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      showAlert('При загрузке данных произошла ошибка. Попробуйте повторить позднее.');
    });
};

const sendAdvert = (advert, onSuccess, onError) => {
  fetch(SERVER_URL,
    {
      method: 'POST',
      body: advert,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {fetchAdverts, sendAdvert};
