// Edit Profile PopUp Basics
const popupEditProfile = document.querySelector('.edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const profileCloseButton = popupEditProfile.querySelector('.close-button');
const profileFormElement = popupEditProfile.querySelector('.form');

const nameInput = document.querySelector('.form__input_data_name');
const jobInput = document.querySelector('.form__input_data_job');

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
// AddPhoto PopUp Basics
const popupAddCard = document.querySelector('.add-card');

const addCardButton = document.querySelector('.profile__add-button');
const addCardCloseButton = popupAddCard.querySelector('.close-button');
const addFormElement = popupAddCard.querySelector('.form');

const cardNameInput = document.querySelector('.form__input_data_place');
const cardLinkInput = document.querySelector('.form__input_data_link');
// Card PopUp Basics
const popupCard = document.querySelector('.preview');
const popupCardImage = popupCard.querySelector('.preview__image');
const popupCardTitle = popupCard.querySelector('.preview__caption');
const cardCloseButton = popupCard.querySelector('.close-button');
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
}
//Закрытие Popup
function closePopup(elem) {
  elem.classList.remove('popup_opened');
}

// EditProfile PopUp Toggler Function
function toggleEditPopup() {
  popupEditProfile.classList.toggle('popup_opened');
// Поля заполняются при открытии
  if (popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  }
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
  addFormElement.reset();
  closePopup(popupAddCard);
}

// EditProfile PopUp Open
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
});
// EditProfile PopUp Close
profileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
// EditProfile PopUp Submit
profileFormElement.addEventListener('submit', editProfileSubmitHandler);


// AddPhoto PopUp Open
addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});
// AddPhoto PopUp Close
addCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});
// AddPhoto PopUp Submit
addFormElement.addEventListener('submit', addCardSubmitHandler);

// Card Popup Close
cardCloseButton.addEventListener('click', () => {
  closePopup(popupCard);
});

// Add initial cards
initialCards.forEach((item) => {
  renderCard(createCard(item));
});
