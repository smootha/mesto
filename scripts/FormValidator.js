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
