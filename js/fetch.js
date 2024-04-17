import { renderAnnouncement } from './map.js';
import { showGetError } from './alerts.js';

const OBJECTS_COUNT = 10;

const getDataFilter = (paramFilter) => {
  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showGetError('Ошибка загрузки данных с сервера');
      }
    })
    .catch(() => {
      showGetError('Ошибка загрузки данных с сервера');
    })
    .then((objects) => {
      let aFiltered = objects.filter(paramFilter).slice(0, OBJECTS_COUNT);
      renderAnnouncement(aFiltered);
    });
};

import { showPostError, showSuccess } from './alerts.js';

// ОТПРАВКА ФОРМЫ
const submitApplication = document.querySelector('.ad-form');

submitApplication.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        showSuccess('Ваше объявление<br>успешно размещено!');
      } else {
        showPostError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showPostError('Не удалось отправить форму. Попробуйте ещё раз');
    });
});

export { getDataFilter };
