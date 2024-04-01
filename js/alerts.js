import { checkEsc } from './util.js';

const removeAllert = (type) => {
  document.querySelector(type).remove();
};

//ремув по клику
document.addEventListener('keydown', function () {
  const ecsError = document.querySelector('.error');
  const escErrorData = document.querySelector('.errorData');
  const escSucces = document.querySelector('.success');
  if (checkEsc && ecsError) {
    removeAllert('.error');
  }
  else if (checkEsc && escErrorData){
    removeAllert('.errorData');
  }else if (checkEsc && escSucces){
    removeAllert('.succes');
  }
});

//ошибка отправки данных
const body = document.querySelector('body');
const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorFragment = document.createDocumentFragment();

const showPostError = (text) => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__message').textContent = text;
  errorFragment.appendChild(errorElement);
  body.appendChild(errorFragment);

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    removeAllert('.error');
  });
};

//ошибка получения данных
const errorDataTemplate = document
  .querySelector('#errorData')
  .content.querySelector('.errorData');
const errorDataFragment = document.createDocumentFragment();

const showGetError = (text) => {
  const errorDataElement = errorDataTemplate.cloneNode(true);
  errorDataElement.querySelector('.errorData__message').textContent = text;
  errorDataFragment.appendChild(errorDataElement);
  body.appendChild(errorDataFragment);
  const errorButtonData = errorDataElement.querySelector('.errorData__button');
  errorButtonData.addEventListener('click', () => {
    removeAllert('.errorData');
  });
};

//успешная отправка формы
const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const successFragment = document.createDocumentFragment();

const showSuccess = (text) => {
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__title').textContent = text;
  successFragment.appendChild(successElement);
  body.appendChild(successFragment);
}

export { showPostError, showGetError, showSuccess };
