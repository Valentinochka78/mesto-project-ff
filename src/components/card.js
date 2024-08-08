const cardTemplate = document.querySelector('#card-template').content; 

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
    cardImage.addEventListener('click', () => openCard(cardData));

    return cardElement;  
}

const likeCard = evt => {
    evt.target.classList.toggle('card__like-button_is-active');
}

const removeCard = event => {  
    const card = event.target.closest('.card');  
    card.remove();  
} 

export { createCard, removeCard, likeCard };






