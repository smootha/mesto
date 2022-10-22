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
