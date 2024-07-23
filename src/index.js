import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard } from './components/card';
import { openPopup, closePopup, handleEscClose, closePopupByOverlay } from './components/modal';

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const cardItems = document.querySelectorAll('.places__item');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileOpenButton = document.querySelector('.edit-profile-button');
const newCardOpenButton = document.querySelector('.new-card-button');
const closeButtons = document.querySelectorAll('.popup__close');
const editProfileForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const nameInput = editProfileForm.querySelector('.popupinput_type_name');
const descriptionInput = editProfileForm.querySelector('.popupinput_type_description');
const placeNameInput = newPlaceForm.querySelector('.popupinput_type_card-name');
const linkInput = newPlaceForm.querySelector('.popupinput_type_url');
const addButton = document.querySelector('.add-button');
const closePopupButton = newCardPopup.querySelector('.popup__close');

function renderInitialCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element, removeCard));
  });
}
renderInitialCards();

function handleEditProfileOpenButtonClick() {
  openPopup(editProfilePopup);
}

function openEditProfileModal() {
  openPopup(editProfilePopup);
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  console.log('Форма отправлена');
}

editProfileOpenButton.addEventListener('click', handleEditProfileOpenButtonClick);

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function openImagePopup() {
  openPopup(imagePopup);
}

newCardOpenButton.addEventListener('click', openImagePopup);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !event.defaultPrevented) {
    closePopup(event.target);
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.popup')) {
    closePopupByOverlay(event.target);
  }
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button);
  });
});

function findAndAttachEventHandlers() {
  document.querySelectorAll('.content').forEach((element) => {
    element.addEventListener('click', (event) => {
      console.log('Клик по элементу .content:', element);
    });
  });

  const cardTemplateElement = document.getElementById('card-template');
  if (cardTemplateElement) {
    cardTemplateElement.addEventListener('click', (event) => {
      console.log('Клик по элементу #card-template:', event.target);
    });
  }

  document.querySelectorAll('.places__list').forEach((element) => {
    element.addEventListener('click', (event) => {
      console.log('Клик по элементу .places__list:', element);
    });
  });

  document.querySelectorAll('.places__item').forEach((element) => {
    element.addEventListener('click', (event) => {
      console.log('Клик по элементу .places__item:', element);
    });
  });
}

findAndAttachEventHandlers();
