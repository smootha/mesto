import {
  popups,
  buttonsClose,
  popupEditProfile,
  buttonEditProfile,
  formElementProfile,
  nameInput,
  jobInput,
  userName,
  userJob,
  buttonSubmitEditProfile,
  popupAddCard,
  buttonAddCard,
  formElementAdd,
  cardNameInput,
  cardLinkInput,
  buttonSubmitAddCard,
  popupCardImage,
  popupCardTitle,
  cardsGallery,
  validationObject,
  initialCards
  } from '../utils/constants.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

// Добавляю класс для управления данными пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

const popupProfile = new Popup('.edit-profile');
popupProfile.setEventListeners();

const popupCards = new Popup('.add-card');
popupCards.setEventListeners();

export const popupPreview = new PopupWithImage('.preview');
popupPreview.setEventListeners();

const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const initialCard = new Card(item);
    const newInitialCard = initialCard.generateCard();
    initialCardsList.setItems(newInitialCard);
  }
}, '.cards');

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
// EditProfile PopUp Submit
function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__job'
  });
  userInfo.setUserInfo(nameInput, jobInput);
  addInactiveStatus(buttonSubmitEditProfile);
  popupProfile.close();
}
// createCard PopUp Submit
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const object = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  const cardSubmit = new Section({
    items: [object],
    renderer: (item) => {
      const card = new Card(item);
      const newCard = card.generateCard();
      cardSubmit.setItems(newCard);
    }
  }, '.cards');
  cardSubmit.renderItems();
  formElementAdd.reset();
  addInactiveStatus(buttonSubmitAddCard);
  popupCards.close();
}
// EditProfile PopUp Open
buttonEditProfile.addEventListener('click', () => {
  profileFormValidation.resetClosedForm();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  popupProfile.open();
});
// EditProfile PopUp Submit
formElementProfile.addEventListener('submit', editProfileSubmitHandler);
// AddCard PopUp Open
buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  cardFormValidation.resetClosedForm();
  popupCards.open();
});
// AddCard PopUp Submit
formElementAdd.addEventListener('submit', addCardSubmitHandler);
// Добавление базовых карточек
initialCardsList.renderItems();
