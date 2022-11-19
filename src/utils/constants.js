// Popup Element Arrays
export const popups = Array.from(document.querySelectorAll('.popup'));
export const buttonsClose = Array.from(document.querySelectorAll('.close-button'));
// Edit Profile PopUp Basics
export const popupEditProfile = document.querySelector('.edit-profile');
export const buttonEditProfile = document.querySelector('.profile__edit-button');

export const formElementProfile = popupEditProfile.querySelector('.form');

export const nameInput = popupEditProfile.querySelector('.form__input_data_name');
export const jobInput = popupEditProfile.querySelector('.form__input_data_job');

export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__job');

export const buttonSubmitEditProfile = popupEditProfile.querySelector('.form__submit');
// AddCard PopUp Basics
export const popupAddCard = document.querySelector('.add-card');

export const buttonAddCard = document.querySelector('.profile__add-button');
export const formElementAdd = popupAddCard.querySelector('.form');

export const cardNameInput = popupAddCard.querySelector('.form__input_data_place');
export const cardLinkInput = popupAddCard.querySelector('.form__input_data_link');

export const buttonSubmitAddCard = popupAddCard.querySelector('.form__submit');
// Галлерея карточек
export const cardsGallery = document.querySelector('.cards');
// Card PopUp Basics
export const popupCard = document.querySelector('.preview');
export const popupCardImage = popupCard.querySelector('.preview__image');
export const popupCardTitle = popupCard.querySelector('.preview__caption');
// Объект настроек валидации
export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__error_visible',
  closeButtonSelector: '.close-button',
  formErrorSelector: '.form__error'
};
// Предзагруженные карточки
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
