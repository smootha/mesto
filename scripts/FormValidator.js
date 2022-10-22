export class FormValidator {
  constructor(validationObject, form) {
    this._obj = validationObject;
    this._formElement = form.querySelector(this._obj.formSelector);
    this._submitButton = form.querySelector(this._obj.submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(this._obj.inputSelector));
    this._errorList = Array.from(form.querySelectorAll(this._obj.formErrorSelector));
  }
//Отключение кнопки сабмита
  _disableSubmitButton() {
    this._submitButton.classList.add(this._obj.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
// Сброс стилей невалидного инпута
  _removeInvalidStyle(input) {
    const errorElement = this._formElement.querySelector(`.form__error_${input.id}`);
    input.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  }
// Сброс стилей невалидности формы при закрытии попапа до сабмита (установлен для обеих попапов в функции openPopup в index.js)
  resetClosedForm() {
    this._inputList.forEach((input) => {
      this._removeInvalidStyle(input);
    });
    this._disableSubmitButton();
  }
// Ф-ция показа невалидности элемента
  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`.form__error_${input.id}`);
    input.classList.add(this._obj.inputErrorClass);
    errorElement.classList.add(this._obj.errorClass);
    errorElement.textContent = errorMessage;
  }
// Ф-ция скрытия невалидности элемента
  _hideInputError(input) {
    this._removeInvalidStyle(input);
  }
// Ф-ция проверки элемента в форма на невалидность и вывод сообщения об ошибке
  _isValid(input) {
    if(!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }
// Проверка невалидности всех элементов формы
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }
// Поведение сабмита в зависимости от валидности элементов формы
  _toggleSubmitButton() {
    if(this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._submitButton.classList.remove(this._obj.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
//Установка слушателя на ввод формы
  _setInputEventListener(input) {
    input.addEventListener('input', () => {
      this._isValid(input);
      this._toggleSubmitButton();
    });
  }
//Установка слушателей на все элементы формы
  _setEventListeners() {
    this._toggleSubmitButton();
    this._inputList.forEach((input) => {
      this._setInputEventListener(input);
    });
  }
//Внешняя функция включения валидации
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
