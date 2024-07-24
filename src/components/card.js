  const cardTemplate = document.querySelector('#card-template').content;
  
  function createCard(cardData, removeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
    cardImage.addEventListener('click', function() {
    console.log('Изображение было кликнуто!');
});

    });
    return cardElement;
  }
  
  function removeCard(event) {
    event.preventDefault();
    const card = event.target.closest('.card');
    card.remove();
  }

  export { createCard, removeCard };