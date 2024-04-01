import { form, formFilters, fieldset, fieldsetFormFiltres } from './form.js';

let marker;
let mapInit = document.getElementById('map-canvas');

const map = L.map(mapInit)
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    formFilters.classList.remove('ad-form--disabled');
    for (let i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }

    for (let i = 0; i < fieldsetFormFiltres.length; i++) {
      fieldsetFormFiltres[i].removeAttribute('disabled');
    }
  })
  .setView(
    {
      lat: 35.41222,
      lng: 139.413016,
    },
    10);

const markerGroup = L.layerGroup().addTo(map);
let init = false;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.41222,
    lng: 139.413016,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = evt.target.getLatLng();
});

const announcementTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = photoSrc;
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    photosFragment.appendChild(newPhoto);
  });
  return photosFragment;
};

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

const renderAnnouncement = (filter) => {
  if (init) {
    markerGroup.clearLayers();
  }
  filter.forEach(({ location, offer, author, photos }) => {
    const announcement = announcementTemplate.cloneNode(true);

    if (offer.type === 'house') {
      offer.type = 'Дом';
    } else if (offer.type === 'palace') {
      offer.type = 'Дворец';
    } else if (offer.type === 'flat') {
      offer.type = 'Квартира';
    } else if (offer.type === 'bungalow') {
      offer.type = 'Бунгало';
    }

    announcement.querySelector('.popup__title').textContent = offer.title;
    announcement.querySelector(
      '.popup__text--address'
    ).textContent = `${location.x} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${location.y}`;
    announcement.querySelector(
      '.popup__text--price'
    ).textContent = `${offer.price} ₽/ночь`;
    announcement.querySelector('.popup__type').textContent = offer.type;
    announcement.querySelector(
      '.popup__text--capacity'
    ).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    announcement.querySelector(
      '.popup__text--time'
    ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    announcement.querySelector('.popup__description').textContent =
      offer.descriptions;
    author.avatar === 'img/avatars/user11.png'
      ? (announcement.querySelector('.popup__avatar').style.display = 'none')
      : (announcement.querySelector('.popup__avatar').src = author.avatar);
    const cardPhotos = announcement.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    if (offer.photos) {
      const newPhotoElements = createPhotos(offer.photos);
      cardPhotos.appendChild(newPhotoElements);
    } else {
      cardPhotos.remove();
    }

    const cardFeatures = announcement.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    if (offer.features) {
      const newFeatureElements = createFeatures(offer.features);
      cardFeatures.appendChild(newFeatureElements);
    } else {
      cardFeatures.remove();
    }

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    marker = L.marker(location, {
      icon,
    })
      .addTo(markerGroup)
      .bindPopup(announcement);
    init = true;
  });
};

export { renderAnnouncement };
