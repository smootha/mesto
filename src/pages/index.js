import './index.css';

import {
  avatar,
  avatarOverlay,
  popupEditProfile,
  buttonEditProfile,
  popupEditAvatar,
  popupAddCard,
  popupCardTitle,
  popupCardImage,
  buttonAddCard,
  formEditAvatar,
  formElementAdd,
  validationObject,
  initialCards,
  apiConfig
  } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirm.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

import { Api } from '../components/Api.js';
// Добавляю класс для управления данными пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});
// Попап редактирования профиля
const popupProfile = new PopupWithForm(editProfileSubmitHandler, '.edit-profile');
popupProfile.setEventListeners();
// Попап редактирования аватара
const popupAvatar = new PopupWithForm(editAvatarSubmitHandler, '.edit-avatar');
popupAvatar.setEventListeners();
// Попап добавления карточек
const popupCards = new PopupWithForm(addCardSubmitHandler, '.add-card');
popupCards.setEventListeners();
// Попап подтверждения удаления карточки
const popupConfirmation = new PopupWithConfirmation('.delete-card');
popupConfirmation.setEventListeners();
// Попап просмотра картинок
const popupPreview = new PopupWithImage('.preview', popupCardTitle, popupCardImage);
popupPreview.setEventListeners();
// Класс изначальных карточек
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsList.setItems(createCard(item));
  }
}, '.cards');
// Создание валидации
const profileFormValidation = new FormValidator(validationObject, popupEditProfile);
const avatarFormValidation = new FormValidator(validationObject, popupEditAvatar);
const cardFormValidation = new FormValidator(validationObject, popupAddCard);
profileFormValidation.enableValidation();
avatarFormValidation.enableValidation();
cardFormValidation.enableValidation();
// Добавление API
const api = new Api(apiConfig);

// Ф-ция создания карточки
function createCard(item) {
  const card = new Card(item, '.cards__template', handleCardClick, handleDeleteClick);
  const newCardElement = card.generateCard();
  return newCardElement;
}
// Callback сабмита измненения Профиля
function editProfileSubmitHandler({name, about}) {
  api.sendUserData(name, about)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(err);
    });
  profileFormValidation.resetClosedForm();
}
// Callback сабмита изменения Аватара
function editAvatarSubmitHandler({ avatar }) {
  api.sendNewAvatar(avatar)
    .then((avatar) => {
      userInfo.setUserAvatar(avatar);
    })
    .catch((err) => {
      console.log(err);
    });
  avatarFormValidation.resetClosedForm();
}
// Callback сабмита создания карты
function addCardSubmitHandler({place, url}) {
  const object = {
    name: place,
    link: url
  }
  cardsList.setItems(createCard(object));
  cardFormValidation.resetClosedForm();
}
// Callback клика по картинкам
function handleCardClick({name, link}) {
  popupPreview.open({name, link});
}
// Callback удаления карточки
function handleDeleteClick() {
  popupConfirmation.open();
}

// Загрузка данных пользователя с сервера
api.recieveUserData()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((err) => {
    console.log(err);
  });


// EditProfile PopUp Open
buttonEditProfile.addEventListener('click', () => {
  profileFormValidation.resetClosedForm();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});
// EditAvatar PopUp Open
avatarOverlay.addEventListener('click', () => {
  formEditAvatar.reset();
  avatarFormValidation.resetClosedForm();
  popupAvatar.open();
});
// AddCard PopUp Open
buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  cardFormValidation.resetClosedForm();
  popupCards.open();
});
// Отрисовка карточек
cardsList.renderItems();
