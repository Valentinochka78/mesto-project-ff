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
  
  function createCard(cardData, removeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    return cardElement;
  }
  
  function removeCard(event) {
    const card = event.target.closest('.card');
    card.remove();
  }
  
  function renderInitialCards() {
    initialCards.forEach((element) => {
      placesList.append(createCard(element, removeCard));
    });
  }
  renderInitialCards();
  
  function handleLike(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_liked');
  }
  
  function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
  
    const nameValue = nameInput.value;
    const descriptionValue = descriptionInput.value;
    nameInput.value = '';
    descriptionInput.value = '';
  }
  
  function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
  
    const placeNameValue = placeNameInput.value;
    const linkValue = linkInput.value;
    placeNameInput.value = '';
    linkInput.value = '';
  }
  
  editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
  newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);
  
  addButton.addEventListener('click', function() {
    newCardPopup.classList.add('popup_opened');
  });
  
  closePopupButton.addEventListener('click', function() {
    newCardPopup.classList.remove('popup_opened');
  });
  
  
  
  export { createCard, removeCard, renderInitialCards };