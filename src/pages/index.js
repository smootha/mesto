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
export const popupPreview = new PopupWithImage('.preview', popupCardTitle, popupCardImage);
popupPreview.setEventListeners();
// Класс изначальных карточек
const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const initialCard = new Card(item, handleCardClick);
    const newInitialCard = initialCard.generateCard();
    initialCardsList.setItems(newInitialCard);
  }
}, '.cards');
// Создание валидации
const profileFormValidation = new FormValidator(validationObject, popupEditProfile);
const cardFormValidation = new FormValidator(validationObject, popupAddCard);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
// Дезактивация сабмита
function addInactiveStatus(button) {
  button.classList.add('form__submit_inactive');
  button.disabled = true;
}
// Callback сабмита измненения Профиля
function editProfileSubmitHandler({name, comment}) {
  userInfo.setUserInfo(name, comment);
  addInactiveStatus(buttonSubmitEditProfile);
}
// Callback сабмита создания карты
function addCardSubmitHandler({place, url}) {
  const object = {
    name: place,
    link: url
  }
  const cardSubmit = new Section({
    items: [object],
    renderer: (item) => {
      const card = new Card(item, handleCardClick);
      const newCard = card.generateCard();
      cardSubmit.setItems(newCard);
    }
  }, '.cards');
  cardSubmit.renderItems();
  addInactiveStatus(buttonSubmitAddCard);
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
// Добавление базовых карточек
initialCardsList.renderItems();
