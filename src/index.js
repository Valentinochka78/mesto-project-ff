import './pages/index.css';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
  ];

const content = document.querySelector('.content'); 
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard (cardData, removeCard) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
      cardElement.querySelector('.card__title').textContent = cardData.name; 
      const cardImage = cardElement.querySelector('.card__image'); 
      cardImage.src = cardData.link; 
      cardImage.alt = cardData.name; 
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
      deleteButton.addEventListener('click', removeCard); 
        return cardElement; 
    }
  
    function removeCard (event) { 
    const card = event.target.closest('.card'); 
      card.remove(); 
    }
  
    function renderInitialCards() { 
      initialCards.forEach((element) => { 
        placesList.append(createCard(element, removeCard)); 
      }); 
    } 
    renderInitialCards();
  
  
  
  export { createCard, removeCard, renderInitialCards };