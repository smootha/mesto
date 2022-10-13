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
// Card PopUp Basics
const popupCard = document.querySelector('.preview');
const popupCardImage = popupCard.querySelector('.preview__image');
const popupCardTitle = popupCard.querySelector('.preview__caption');
// Добавление карточек: переменные
const cardsGallery = document.querySelector('.cards');
const card = document.querySelector('.cards__template').content;

//Функция создания карточки
function createCard(object) {
  const newCard = card.querySelector('.cards__item').cloneNode(true);
  const cardName = newCard.querySelector('.cards__name');
  const cardImage = newCard.querySelector('.cards__image');
  const name = object.name;
  const link = object.link;
 //Логика открытия изображения на полный экран
  cardImage.addEventListener('click', () => {
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardTitle.textContent = name;
    openPopup(popupCard);
  });
  const buttonLike = newCard.querySelector('.cards__like');
  const buttonDelete = newCard.querySelector('.cards__delete');
 //Логика Лайка
  buttonLike.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__like_active');
  });
 //Логика Удаления
  buttonDelete.addEventListener('click', () => {
    newCard.remove();
  });
  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  return newCard;
}
//Дезактивация сабмита
function addInactiveStatus(button) {
  button.classList.add('form__submit_inactive');
  button.disabled = true;
}
//Функция добавления карточки на страницу
function renderCard(card) {
  cardsGallery.prepend(card);
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
  const cardToAdd = createCard(object);
  renderCard(cardToAdd);
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
  renderCard(createCard(item));
});
