const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`.form__error_${formInput.id}`);

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.form__error_${inputElement.id}`);
  inputElement.classList.add('form__input_invalid');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.form__error_${inputElement.id}`);
  inputElement.classList.remove('form__input_invalid');
  errorElement.textContent = '';
}

function isValid(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();
