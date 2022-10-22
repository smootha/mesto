export class FormValidator {
  constructor(validationObject, form) {
    this._obj = validationObject;
    this._formElement = form.querySelector(this._obj.formSelector);
    this._submitButton = form.querySelector(this._obj.submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(this._obj.inputSelector));
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`.form__error_${input.id}`);
    input.classList.add(this._obj.inputErrorClass);
    errorElement.classList.add(this._obj.errorClass);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.form__error_${input.id}`);
    input.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  }
  _isValid(input) {
    if(!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleSubmitButton() {
    if(this._hasInvalidInput()) {
      this._submitButton.classList.add(this._obj.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._obj.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setInputEventListener(input) {
    input.addEventListener('input', () => {
      this._isValid(input);
      this._toggleSubmitButton();
    });
  }

  _setEventListeners() {
    this._toggleSubmitButton();
    this._inputList.forEach((input) => {
      this._setInputEventListener(input);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

}

/*
// Ф-ция показа невалидности элемента
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.form__error_${inputElement.id}`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
  errorElement.textContent = errorMessage;
}
// Ф-ция скрытия невалидности элемента
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.form__error_${inputElement.id}`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
}
// Проверка невалидности всех элементов формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// Поведение сабмита в зависимости от валидности элементов формы
function toggleSubmitButton(inputList, buttonElement, obj) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
// Ф-ция проверки элемента в форма на невалидность и вывод сообщения об ошибке
function isValid(formElement, inputElement, obj) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}
// Ф-ция назначение обработчика на элемент ввода формы
function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleSubmitButton(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      toggleSubmitButton(inputList, buttonElement, obj);
    });
  });
}
// Ф-ция добавления обработчика проверки на валидность ко всем элементам всех форм
function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__error_visible'
});
*/
