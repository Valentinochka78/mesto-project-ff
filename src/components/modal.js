function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', handleEscClose);
  popup.addEventListener('click', closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', handleEscClose);
  popup.removeEventListener('click', closePopupByOverlay);
}

function handleEscClose(event) {
  if (event.key === 'Escape' && event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

function closePopupByOverlay(event) {
  if (event.target.classList.contains('popup_opened') || event.target.closest('.popup_opened')) {
    closePopup(event.target);
  }
}

export { openPopup, closePopup, handleEscClose, closePopupByOverlay };
