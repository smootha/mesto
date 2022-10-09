// Popup Element Arrays
const popups = Array.from(document.querySelectorAll('.popup'));
const buttonsClose = Array.from(document.querySelectorAll('.close-button'));

// Edit Profile PopUp Basics
const popupEditProfile = document.querySelector('.edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const formElementProfile = popupEditProfile.querySelector('.form');

const nameInput = document.querySelector('.form__input_data_name');
const jobInput = document.querySelector('.form__input_data_job');

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
// AddPhoto PopUp Basics
const popupAddCard = document.querySelector('.add-card');

const buttonAddCard = document.querySelector('.profile__add-button');
const formElementAdd = popupAddCard.querySelector('.form');

const cardNameInput = document.querySelector('.form__input_data_place');
const cardLinkInput = document.querySelector('.form__input_data_link');
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
//Функция добавления карточки на страницу
function renderCard(card) {
  cardsGallery.prepend(card);
}
//Открытие Popup
function openPopup(elem) {
  elem.classList.add('popup_opened');
  closePopupByEsc(elem);
}
//Закрытие Popup кликом по крестику
function closePopup(elem) {
  elem.classList.remove('popup_opened');
}
//Закрытие Popup клавишей Esc
function closePopupByEsc(popup) {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
  });
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
// AddPhoto PopUp Open
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});
// AddPhoto PopUp Submit
formElementAdd.addEventListener('submit', addCardSubmitHandler);
// Add initial cards
initialCards.forEach((item) => {
  renderCard(createCard(item));
});
