import {isEscEvent} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '350px';
  alertContainer.style.right = '350px';
  alertContainer.style.top = '15px';
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.color = 'black';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
};

const closeMessage = (message) => message.remove();

const showMessage = (statusMessage) => {
  document.body.insertAdjacentElement('beforeend', statusMessage);
  document.addEventListener('click', () => closeMessage(statusMessage), {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessage(statusMessage);
    }
  },  {once: true});
};

const showSuccessMessage = () => showMessage(successMessageTemplate.cloneNode(true));

const showErrorMessage = () => showMessage(errorMessageTemplate.cloneNode(true));

export {showAlert, showSuccessMessage, showErrorMessage};
