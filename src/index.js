import './pages/index.css'; 
import { initialCards } from './components/cards'; 
import { createCard, removeCard, likeCard } from './components/card'; 
import { openPopup, closePopup, closePopupByOverlay } from './components/modal'; 
import { enableValidation, clearValidation } from "./components/validation"; 
import { getUserInfo, getCards, deleteOwnCard, updateAvatar, postCard, editProfileInfo } from "./components/api";


const content = document.querySelector('.content'); 
const placesList = document.querySelector('.places__list'); 
const editPopup = document.querySelector('.popup_type_edit'); 
const newCardPopup = document.querySelector('.popup_type_new-card'); 
const imagePopup = document.querySelector('.popup_type_image'); 
const imageElement = imagePopup.querySelector('.popup__image');
const captionElement = imagePopup.querySelector('.popup__caption');
const addButton = document.querySelector(".profile__add-button"); 
const profileButton = document.querySelector(".profile__edit-button"); 
const profileForm = document.forms["edit-profile"]; 
const cardForm = document.forms["new-place"]; 
const cardFormLink = cardForm.link; 
const cardFormName = cardForm["place-name"]; 
const avatarForm = document.forms["edit-avatar"]; 
const avatarInput = avatarForm.avatar; 
const popupDeleteCard = document.querySelector(".popup_type_confirm_delete"); 
const formDeleteCard = document.forms["delete-card"]; 
let userId; 
let cardToDelete; 

const openCard = cardData => { 
    imageElement.src = cardData.link; 
    imageElement.alt = cardData.name; 
    captionElement.textContent = cardData.name; 
    openPopup(imagePopup); 
}; 

function renderInitialCards() { 
    initialCards.forEach((element) => { 
        placesList.append(createCard(cardData, removeCard, likeCard, openCard)); 
    }); 
} 

renderInitialCards(); 

document.querySelector('.profile__edit-button').addEventListener('click', () => { 
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
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

const formElement = editPopup.querySelector('.popup__form[name="edit-profile"]'); 

function handleProfileFormSubmit(evt) { 
    evt.preventDefault(); 
    const nameValue = nameInput.value; 
    const jobValue = jobInput.value; 
    profileTitle.textContent = nameValue; 
    profileDescription.textContent = jobValue; 
    closePopup(formElement.closest('.popup')); 
} 

formElement.addEventListener('submit', handleProfileFormSubmit); 

const newCardForm = newCardPopup.querySelector('form[name="new-place"]'); 

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = cardFormName.value;
    const linkValue = cardFormLink.value;
    const newCardData = { name: nameValue, link: linkValue };
    placesList.prepend(createCard(newCardData, removeCard, likeCard, openCard));
    cardForm.reset();
    closePopup(newCardPopup);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

formDeleteCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (cardToDelete) {
        cardToDelete.remove();
    }
    closePopup(popupDeleteCard);
});

const avatarFormElement = avatarForm.querySelector('.popup__form[name="edit-avatar"]');

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value;
    userAvatar.src = avatarUrl;
    closePopup(avatarFormElement.closest('.popup'));
}

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit); 

newCardForm.addEventListener('submit', (event) => { 
  event.preventDefault(); 
  const placeName = newCardForm.elements['place-name'].value; 
  const link = newCardForm.elements['link'].value; 

  postCard({ name: placeName, link: link })
      .then(newCard => {
          placesList.prepend(createCard(newCard.name, newCard.link, newCard.likes, newCard.owner._id, newCard._id, userId, openDeleteForm, openCard));
          closeModal(newCardPopup); 
          newCardForm.reset(); 
      })
      .catch(error => console.error("Произошла ошибка:", error));
});

function openPopupWithValidation(popup, form) {
  openModal(popup);
  clearValidation(form, validationConfig);
}

addButton.addEventListener("click", () => openPopupWithValidation(buttonOpenPopupCard, cardForm));
profileButton.addEventListener("click", () => {
  openModal(buttonOpenPopupProfile);
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
  clearValidation(profileForm, validationConfig);
});
avatarButton.addEventListener("click", () => openPopupWithValidation(buttonOpenPopupAvatar, avatarForm));

profileForm.addEventListener("submit", handleEditFormSubmit);

formDeleteCard.addEventListener("submit", function (evt) { 
  evt.preventDefault(); 
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);

  deleteCard(cardToDeleteId)
      .then(() => {
          cardToDelete.remove(); 
          closeModal(popupDeleteCard); 
      })
      .catch(error => console.error("Произошла ошибка:", error))
      .finally(() => renderLoading(false, popupElement));
});

window.addEventListener('load', () => enableValidation(validationConfig)); 

function openDeleteForm(card, cardId) { 
  openModal(popupDeleteCard); 
  cardToDelete = card;
  cardToDeleteId = cardId;
} 

function deleteCard(cardId) { 
  const popupElement = document.querySelector(".popup_is-opened"); 
  renderLoading(true, popupElement, 'delete');
deleteOwnCard(cardId) 
    .then(() => { 
      const cardToRemove = document.querySelector(`[data-id="${cardId}"]`);
      cardToRemove.remove(); 
      closeModal(popupDeleteCard); 
    }) 
    .catch((error) => { 
      console.error("Произошла ошибка:", error); 
      alert("Не удалось удалить карточку. Попробуйте еще раз.");
    }) 
    .finally(() => { 
      renderLoading(false, popupElement, 'delete'); 
    }); 
} 

function renderLoading(isLoading, popupElement, actionType) { 
  const activeButton = popupElement.querySelector(".popup__button"); 
  if (isLoading) { 
    activeButton.textContent = actionType === 'delete' ? "Удаление..." : "Сохранение..."; 
  } else { 
    activeButton.textContent = actionType === 'delete' ? "Да" : "Сохранить"; 
  } 
} 

Promise.all([getUserInfo(), getCards()]) 
  .then(([userData, cardData]) => { 
    userAbout.textContent = userData.about; 
    userName.textContent = userData.name; 
    userAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id; 

    cardData.forEach(card => { 
      cardList.append( 
        createCard( 
          card.name, 
          card.link, 
          card.likes, 
          card.owner._id, 
          card._id, 
          userId, 
          openDeleteForm, 
          openCard 
        ) 
      ); 
    }); 
  }) 
  .catch((error) => { 
    console.error("Произошла ошибка:", error); 
    alert("Не удалось загрузить данные. Попробуйте обновить страницу.");
  });