import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard, likeCard, openCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function renderInitialCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element, removeCard, likeCard, openCard));
  });
}
renderInitialCards();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
  openPopup(editPopup);
});

document.querySelector('.profile__add-button').addEventListener('click', () => openPopup(newCardPopup)); 
document.querySelectorAll('.popup__close').forEach(button => { 
button.addEventListener('click', (event) => { 
closePopup(event.target.closest('.popup')); 
});
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', closePopupByOverlay);
});

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function popupFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(formElement.closest('.popup'));
}

formElement.addEventListener('submit', popupFormSubmit);

const newCardForm = newCardPopup.querySelector('form[name="new-place"]');

newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const placeName = newCardForm.elements['place-name'].value;
  const link = newCardForm.elements['link'].value;
  const newCard = createCard({ name: placeName, link: link }, removeCard);
  placesList.prepend(newCard);
  closePopup(newCardPopup);
  newCardForm.reset();
});
