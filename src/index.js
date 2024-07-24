import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard } from './components/card';
import { openPopup, closePopup, handleEscClose, closePopupByOverlay } from './components/modal';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const formElement = document.querySelector('.popup__form[name="new-place"]');

function renderInitialCards() {
 initialCards.forEach((element) => {
 placesList.append(createCard(element, removeCard));
  });
}
renderInitialCards();

document.querySelector('.profile__add-button').addEventListener('click', function() {
document.querySelector('.popup_type_new-card').style.display = 'block';
});

document.querySelector('.popup__close').addEventListener('click', function() {
document.querySelector('.popup_type_new-card').style.display = 'none';
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = document.querySelector('.popupinput_type_card-name');
  const linkInput = document.querySelector('.popupinput_type_url');
  const placeName = placeNameInput.value;
  const link = linkInput.value;
  const newCard = document.createElement('li');
  newCard.classList.add('places__item', 'card');

  const image = document.createElement('image');
  image.classList.add('card__image');
  image.src = link;
  image.alt = placeName;
  newCard.appendChild(image);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('card__delete-button');
  newCard.appendChild(deleteButton);

  const description = document.createElement('div');
  description.classList.add('card__description');
  newCard.appendChild(description);

  const title = document.createElement('h2');
  title.classList.add('card__title');
  title.textContent = placeName;
  description.appendChild(title);

  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.classList.add('card__like-button');
  description.appendChild(likeButton);
  placesList.insertBefore(newCard, placesList.firstChild);

  const closeButton = document.querySelector('.popup__close');
  closeButton.click();

  formElement.reset();
}

formElement.addEventListener('submit', handleFormSubmit);

function handleNewPlaceFormSubmit() {
  const form = document.forms['new-place'];
  if (!form.checkValidity()) return;
  const placeName = form.placeName.value;
  const link = form.link.value;
  const cardElement = document.createElement('li');
  cardElement.classList.add('places__item', 'card');
  const imgElement = document.createElement('img');
  imgElement.classList.add('card__image');
  imgElement.src = link;
  cardElement.appendChild(imgElement);
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('card__delete-button');
  cardElement.appendChild(deleteButton);
  const descriptionElement = document.createElement('div');
  descriptionElement.classList.add('card__description');
  cardElement.appendChild(descriptionElement);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('card__title');
  titleElement.textContent = placeName;
  descriptionElement.appendChild(titleElement);

  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.classList.add('card__like-button');
  descriptionElement.appendChild(likeButton);
  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.insertBefore(cardElement, cardsContainer.firstChild);
  form.reset();
  const popup = document.querySelector('.popup_type_new-card');
  popup.classList.remove('is-visible');
}

document.forms['new-place'].addEventListener('submit', handleNewPlaceFormSubmit);
