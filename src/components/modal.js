function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

editProfileOpenButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
});

newCardOpenButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

closeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popups.forEach(function(popup) {
  popup.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

export { openPopup, closePopup };