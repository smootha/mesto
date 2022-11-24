import './index.css';

import {
  popupEditProfile,
  buttonEditProfile,
  nameInput,
  jobInput,
  buttonSubmitEditProfile,
  popupAddCard,
  popupCardTitle,
  popupCardImage,
  buttonAddCard,
  formElementAdd,
  buttonSubmitAddCard,
  validationObject,
  initialCards
  } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

// Добавляю класс для управления данными пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});
// Попап редактирования профиля
const popupProfile = new PopupWithForm(editProfileSubmitHandler, '.edit-profile');
popupProfile.setEventListeners();
// Попап добавления карточек
const popupCards = new PopupWithForm(addCardSubmitHandler, '.add-card');
popupCards.setEventListeners();
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
const cardFormValidation = new FormValidator(validationObject, popupAddCard);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
// Ф-ция создания карточки
function createCard(item) {
  const card = new Card(item, '.cards__template', handleCardClick);
  const newCardElement = card.generateCard();
  return newCardElement;
}
// Callback сабмита измненения Профиля
function editProfileSubmitHandler({name, comment}) {
  userInfo.setUserInfo(name, comment);
  profileFormValidation.resetClosedForm();
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
// EditProfile PopUp Open
buttonEditProfile.addEventListener('click', () => {
  profileFormValidation.resetClosedForm();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  popupProfile.open();
});
// AddCard PopUp Open
buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  cardFormValidation.resetClosedForm();
  popupCards.open();
});
// Отрисовка карточек
cardsList.renderItems();
