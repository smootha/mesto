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
  cardsGallery,
  validationObject,
  initialCards
  } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';

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

/*
//Функция добавления карточки в галлерею
function renderCard(item) {
  const newCard = new Card(item);
  const cardElement = newCard.generateCard();
  cardsGallery.prepend(cardElement);
}
*/

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
  popup.addEventListener(('click'), evt => {
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
  //renderCard(object);
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
  closePopup(popupAddCard);
}
//Обработчик на все задники
popups.forEach(popup => {
  closePopupByOverlay(popup);
});
//Обработчик на все кнопки закрытия Попапов
buttonsClose.forEach(closeButton => {
  closeButton.addEventListener('click', evt => {
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
// Добавление базовых карточек
initialCardsList.renderItems();
