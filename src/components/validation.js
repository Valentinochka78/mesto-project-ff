function validateInput(value, allowedCharacters) {
  const regex = new RegExp(`^[${allowedCharacters}]+$`);
  return regex.test(value);
}

function showErrorMessage(element, message) {
  element.dataset.error = message;
  element.classList.add('error');
}

function hideErrorMessage(element) {
  element.dataset.error = null;
  element.classList.remove('error');
}

function enableValidation(options) {
  const {
  formSelector = '.popup__form',
  inputSelector = '.popup__input',
  submitButtonSelector = '.popup__button',
  inactiveButtonClass = 'popup__button_disabled',
  inputErrorClass = 'popup__input_type_error',
  errorClass = 'popup__error_visible'
  } = options;

  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
    form.addEventListener('input', event => {
      const target = event.target;
      if (!validateInput(target.value, '/^[a-zа-яА-ЯёЁ -]+$/i')) {
        showErrorMessage(target, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
      } else {
        hideErrorMessage(target);
      }

      const isValid = Array.from(form.elements).every(el => !el.dataset.error);
      form.querySelector(submitButtonSelector).classList.toggle(inactiveButtonClass, !isValid);
    });
  });

  document.querySelectorAll(inputSelector).forEach(input => {
    input.addEventListener('focus', () => {
      hideErrorMessage(input);
    });
    input.addEventListener('blur', () => {
      if (!validateInput(input.value, '/^[a-zа-яА-ЯёЁ -]+$/i')) {
        showErrorMessage(input, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
      }
    });
  });

  document.querySelectorAll(submitButtonSelector).forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add(inactiveButtonClass);
    });
  });
}

function clearValidation(formElement, options) {
  const {
    inactiveButtonClass,
    inputErrorClass
  } = options;

  formElement.querySelectorAll(inputErrorClass).forEach(input => {
    input.classList.remove(inputErrorClass);
  });

  formElement.querySelectorAll(submitButtonSelector).forEach(button => {
    button.classList.add(inactiveButtonClass);
  });
}

export { enableValidation, clearValidation };


    

  
  