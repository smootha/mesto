// Ф-ция показа невалидности элемента
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.form__error_${inputElement.id}`);
  inputElement.classList.add('form__input_invalid');
  errorElement.textContent = errorMessage;
}
// Ф-ция скрытия невалидности элемента
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.form__error_${inputElement.id}`);
  inputElement.classList.remove('form__input_invalid');
  errorElement.textContent = '';
}
// Проверка невалидности всех элементов формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// Поведение сабмита в зависимости от валидности элементов формы
function toggleSubmitButton(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    console.log('hi');
  } else {
    buttonElement.classList.remove('form__submit_inactive');
    console.log('bye');
  }
}
// Ф-ция проверки элемента в форма на невалидность и вывод сообщения об ошибке
function isValid(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
// Ф-ция назначение обработчика на элемент ввода формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleSubmitButton(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleSubmitButton(inputList, buttonElement);
    });
  });
}
// Ф-ция добавления обработчика проверки на валидность ко всем элементам всех форм
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();
