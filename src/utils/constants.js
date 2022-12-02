// API config
export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    'Content-type': 'application/json',
    authorization: '49831d17-f3f1-4637-907e-4e644dcd95e5'
  }
}

// Edit Profile PopUp Basics
export const popupEditProfile = document.querySelector('.edit-profile');
export const buttonEditProfile = document.querySelector('.profile__edit-button');

export const formElementProfile = popupEditProfile.querySelector('.form');

export const nameInput = popupEditProfile.querySelector('.form__input_data_name');
export const jobInput = popupEditProfile.querySelector('.form__input_data_job');

export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__job');

export const buttonSubmitEditProfile = popupEditProfile.querySelector('.form__submit');
//Edit Avatar Popup Basics
export const popupEditAvatar = document.querySelector('.edit-avatar');
export const formEditAvatar = popupEditAvatar.querySelector('.form');
export const avatarOverlay = document.querySelector('.profile__avatar-overlay');
export const avatar = document.querySelector('.profile__avatar');
// AddCard PopUp Basics
export const popupAddCard = document.querySelector('.add-card');

export const buttonAddCard = document.querySelector('.profile__add-button');
export const formElementAdd = popupAddCard.querySelector('.form');

export const cardNameInput = popupAddCard.querySelector('.form__input_data_place');
export const cardLinkInput = popupAddCard.querySelector('.form__input_data_link');

export const buttonSubmitAddCard = popupAddCard.querySelector('.form__submit');
// Popup подтверждения удаления карточки
export const popupDeleteCard = document.querySelector('.delete-card');
export const buttonSubmitDeleteCard = popupDeleteCard.querySelector('.form__submit');
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
