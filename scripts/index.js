import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Popup Element Arrays
const popups = Array.from(document.querySelectorAll('.popup'));
const buttonsClose = Array.from(document.querySelectorAll('.close-button'));
// Edit Profile PopUp Basics
const popupEditProfile = document.querySelector('.edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const formElementProfile = popupEditProfile.querySelector('.form');

const nameInput = popupEditProfile.querySelector('.form__input_data_name');
const jobInput = popupEditProfile.querySelector('.form__input_data_job');

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

const buttonSubmitEditProfile = popupEditProfile.querySelector('.form__submit');
// AddCard PopUp Basics
const popupAddCard = document.querySelector('.add-card');

const buttonAddCard = document.querySelector('.profile__add-button');
const formElementAdd = popupAddCard.querySelector('.form');

const cardNameInput = popupAddCard.querySelector('.form__input_data_place');
const cardLinkInput = popupAddCard.querySelector('.form__input_data_link');

const buttonSubmitAddCard = popupAddCard.querySelector('.form__submit');
// Галлерея карточек
const cardsGallery = document.querySelector('.cards');
// Объект настроек валидации
const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__error_visible',
  closeButtonSelector: '.close-button',
  formErrorSelector: '.form__error'
};
//Создание валидации
const profileFormValidation = new FormValidator(validationObject, popupEditProfile);
const cardFormValidation = new FormValidator(validationObject, popupAddCard);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

//Дезактивация сабмита
function addInactiveStatus(button) {
  button.classList.add('form__submit_inactive');
  button.disabled = true;
}
//Функция добавления карточки в галлерею
function renderCard(item) {
  const newCard = new Card(item.name, item.link);
  const cardElement = newCard.generateCard();
  cardsGallery.prepend(cardElement);
}
//Закрытие клавишей Esc
function closeByEsc(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}
//Открытие Popup
function openPopup(popup) {
  //Сбрасывают стили невалидности при закрытии формы
  profileFormValidation.resetClosedForm();
  cardFormValidation.resetClosedForm();

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//Закрытие Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//Закрытие Popup кликом по заднику
function closePopupByOverlay(popup) {
  popup.addEventListener(('click'), (evt) => {
    if (evt.target.classList.contains('popup')) {
    closePopup(popup);
    }
  })
}
// EditProfile PopUp Submit
function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  addInactiveStatus(buttonSubmitEditProfile);
  closePopup(popupEditProfile);
}
// createCard PopUp Submit
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const object = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  renderCard(object);
  formElementAdd.reset();
  addInactiveStatus(buttonSubmitAddCard);
  closePopup(popupAddCard);
}
//Обработчик на все задники
popups.forEach((popup) => {
  closePopupByOverlay(popup);
});
//Обработчик на все кнопки закрытия Попапов
buttonsClose.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});
// EditProfile PopUp Open
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
});
// EditProfile PopUp Submit
formElementProfile.addEventListener('submit', editProfileSubmitHandler);
// AddCard PopUp Open
buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  openPopup(popupAddCard);
});
// AddCard PopUp Submit
formElementAdd.addEventListener('submit', addCardSubmitHandler);
// Add initial cards
initialCards.forEach((item) => {
  renderCard(item);
});
