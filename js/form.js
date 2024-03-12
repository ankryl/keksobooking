//валидация на js
let typeHousing = document.querySelector('#type');
let price = document.querySelector('#price');
let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');
let roomNumber = document.querySelector('#room_number');
let capacityNumber = document.querySelector('#capacity');
let buttonSubmit = document.querySelector('.ad-form__submit');
let inputAvatar = document.querySelector('.ad-form-header__input');
let inputAvatarBorder = document.querySelector('.ad-form-header__drop-zone');
let inputImgHouse = document.querySelector('.ad-form__input');
let inputImgHouseBorder = document.querySelector('.ad-form__drop-zone');

//фото аватар
inputAvatar.addEventListener('change', (evt) => {
  let regex = /\.(png|jpg|jpeg)$/i;
  if (regex.test(evt.currentTarget.value)) {
    inputAvatarBorder.style.border = 'dashed 1px #c7c7c7';
    inputAvatar.setCustomValidity("");
    buttonSubmit.removeAttribute('disabled');
  } else {
    inputAvatarBorder.style.border = 'dashed 2px red';
    inputAvatar.setCustomValidity('только файлы формата png или jpg!');
    buttonSubmit.setAttribute('disabled', 'disabled');
  }
  inputAvatar.reportValidity();
});

//фото жилья
inputImgHouse.addEventListener("change", (evt) => {
  let regex = /\.(png|jpg)$/i;
  if (regex.test(evt.currentTarget.value)) {
    inputImgHouseBorder.style.border = "dashed 1px #c7c7c7";
    inputImgHouse.setCustomValidity("");
    buttonSubmit.removeAttribute("disabled");
  } else {
    inputImgHouseBorder.style.border = "dashed 2px red";
    inputImgHouse.setCustomValidity("только файлы формата png и jpg!");
    buttonSubmit.setAttribute("disabled", "disabled");
  }
  inputImgHouse.reportValidity();
});

//тип жилья и цена за ночь
const MIN_PRICE_OF_TYPE = {
  bungalow: "0",
  flat: "1000",
  hotel: "3000",
  house: "5000",
  palace: "10000",
};

const MAX_PRICE = 1000000;

typeHousing.addEventListener("change", () => {
  price.placeholder = MIN_PRICE_OF_TYPE[typeHousing.value];
  price.min = MIN_PRICE_OF_TYPE[typeHousing.value];
});

price.addEventListener("change", () => {
  const valuePrice = price.value;
  if (parseFloat(valuePrice.toString()) < MIN_PRICE_OF_TYPE[typeHousing.value].toString()) {
    price.style.borderColor = "red";
  } else if (valuePrice > MAX_PRICE) {
    price.style.borderColor = "red";
    price.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}.`);
  } else {
    price.style.borderColor = 'white';
    price.setCustomValidity("");
  }
  price.reportValidity();
});

//время заезда и выезда
timeIn.addEventListener("change", () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener("change", () => {
  timeIn.value = timeOut.value;
});

//кол-во комнат и кол-во мест
capacityNumber.addEventListener("change", () => {
  if (roomNumber.value === "1" && capacityNumber.value != "1") {
    capacityNumber.style.borderColor = "red";
    capacityNumber.setCustomValidity(
      "В 1 комнате возможно разместить только 1 гостя"
    );
  } else if (
    roomNumber.value === "2" &&
    capacityNumber.value !== "1" &&
    capacityNumber.value !== "2"
  ) {
    capacityNumber.style.borderColor = "red";
    capacityNumber.setCustomValidity(
      "В 2 комнатах возможно разместить только от 1 до 2 гостей"
    );
  } else if (roomNumber.value === '3' && capacityNumber.value === '0') {
    capacityNumber.style.borderColor = 'red';
    capacityNumber.setCustomValidity(
      'В 3 комнатах возможно разместить только от 1 до 3 гостей'
    );
  } else if (roomNumber.value === '100' && capacityNumber.value !== '0') {
    capacityNumber.style.borderColor = 'red';
    capacityNumber.setCustomValidity('100 комнат не для гостей');
  } else {
    capacityNumber.setCustomValidity('');
  }
  capacityNumber.reportValidity();
});

// Создать превью аватара (Ваша фотография)
const adFormAvatar = document.querySelector('.ad-form-header__preview');
const avatarPreview = document.querySelector('img').cloneNode(true);
const loadAvatar = document.querySelector('#avatar');
import { renderPhoto } from './avatar.js';

const getAvatar = (result) => {
  const fragment = document.createDocumentFragment();
  avatarPreview.src = result;
  fragment.appendChild(avatarPreview);
  adFormAvatar.innerHTML = '';
  adFormAvatar.appendChild(fragment);
};

const getAvatarPreview = () => renderPhoto(loadAvatar, getAvatar);

getAvatarPreview();

const adFormPhoto = document.querySelector('.ad-form__photo');
const photoChooser = document.querySelector('#images');
const IMG_WIDTH = 70;
const IMG_HEIGHT = 70;

const getPhoto = (result) => {
  adFormPhoto.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const element = document.createElement('img');
  element.src = result;
  element.alt = 'Фото жилья';
  element.width = IMG_WIDTH;
  element.height = IMG_HEIGHT;
  fragment.appendChild(element);
  adFormPhoto.appendChild(fragment);
};

const getPhotoPreview = () => renderPhoto(photoChooser, getPhoto);

getPhotoPreview();


//ПЕРЕВОД ФОРМЫ В НЕАКТИВНОЕ СОСТОЯНИЕ
const form = document.querySelector('.ad-form');
const fieldset = document.querySelectorAll('.ad-form__element');
const formFilters = document.querySelector('.map__filters');
const fieldsetFormFiltres = formFilters.children;

form.classList.add('ad-form--disabled');
formFilters.classList.add('ad-form--disabled');

for (let i = 0; i < fieldset.length; i++) {
  fieldset[i].setAttribute('disabled', 'disabled');
}

for (let i = 0; i < fieldsetFormFiltres.length; i++) {
  fieldsetFormFiltres[i].setAttribute('disabled', 'disabled');
}

export { form, formFilters, fieldset, fieldsetFormFiltres };
