function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', closePopupByOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', closePopupByOverlay);
}

function handleEscClose(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function closePopupByOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}
 
export { openPopup, closePopup, closePopupByOverlay };
