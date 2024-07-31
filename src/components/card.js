const cardTemplate = document.querySelector('#card-template').content; 

// Колбэк для лайка
const likeCard = evt => {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
const removeCard = event => {  
    const card = event.target.closest('.card');  
    card.remove();  
} 

// Функция создания карточки
function createCard(cardData, removeCard, likeCard, openCard) {  
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  

    cardElement.querySelector('.card__title').textContent = cardData.name;  

    const cardImage = cardElement.querySelector('.card__image');  
    cardImage.src = cardData.link;  
    cardImage.alt = cardData.name;  

    const deleteButton = cardElement.querySelector('.card__delete-button');  
    deleteButton.addEventListener('click', removeCard); 

    const likeButton = cardElement.querySelector('.card__like-button');  
    likeButton.addEventListener('click', likeCard); 

    // Добавляем обработчик клика на изображение для открытия попапа
    cardImage.addEventListener('click', () => openCard(cardData));

    return cardElement;  
}

// Колбэк для открытия попапа с картинкой
const openCard = cardData => {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaptionElement = popupImage.querySelector('.popup__caption');
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupCaptionElement.textContent = cardData.name;
    openPopup(popupImage);
}

// Экспортируем функции
export { createCard, removeCard, likeCard, openCard };






