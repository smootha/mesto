// Edit Profile PopUp Basics
const popupEditProfile = document.querySelector('.popup__type_edit-profile');

const editButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const profileFormElement = popupEditProfile.querySelector('.form__type_edit-profile');

const nameInput = document.querySelector('.form__input_data_name');
const jobInput = document.querySelector('.form__input_data_job');

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

// EditProfile PopUp Toggler Function
function toggleEditPopup() {
  popupEditProfile.classList.toggle('popup_opened');
// Поля заполняются при открытии
  if (popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  }
}

// EditProfile PopUp Open
editButton.addEventListener('click', toggleEditPopup);

// EditProfile PopUp Close
profileCloseButton.addEventListener('click', toggleEditPopup);

// EditProfile PopUp Submit
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  toggleEditPopup();
}
profileFormElement.addEventListener('submit', editFormSubmitHandler);


// AddPhoto PopUp Basics
const popupAddCard = document.querySelector('.popup__type_add-card');

const addCardButton = document.querySelector('.profile__add-button');
const addCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const addFormElement = popupAddCard.querySelector('.form__type_add-card');

const cardNameInput = document.querySelector('.form__input_data_place');
const cardLinkInput = document.querySelector('.form__input_data_link');

// AddPhoto PopUp Toggler Function
function toggleAddPopup() {
  popupAddCard.classList.toggle('popup_opened');
}

// AddPhoto PopUp Open
addCardButton.addEventListener('click', toggleAddPopup);

// AddPhoto PopUp Close
addCardCloseButton.addEventListener('click', toggleAddPopup);

// EditProfile PopUp Submit
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  let name = cardNameInput.value;
  let link = cardLinkInput.value;
  addCard(name, link);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  toggleAddPopup();
}
addFormElement.addEventListener('submit', addFormSubmitHandler);


// Card PopUp Basics
const popupCard = document.querySelector('.popup__type_card');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardTitle = popupCard.querySelector('.popup__caption');
const cardCloseButton = popupCard.querySelector('.popup__close-button');

// Card PopUp Toggler Function
function toggleCardPopup() {
  popupCard.classList.toggle('popup_opened');
}

// Card Popup Close
cardCloseButton.addEventListener('click', toggleCardPopup);



// Добавление карточек: переменные
const cardsGallery = document.querySelector('.cards');
const card = document.querySelector('.cards__template').content;

//Функция добавления карточки
function addCard(name, link) {
  const newCard = card.querySelector('.cards__item').cloneNode(true);
  const cardName = newCard.querySelector('.cards__name');
  const cardImage = newCard.querySelector('.cards__image');
//Логика открытия изображения на полный экран
  cardImage.addEventListener('click', (evt) => {
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = cardName.textContent;
    popupCardTitle.textContent = cardName.textContent;
    toggleCardPopup();
  });
  const likeButton = newCard.querySelector('.cards__like');
  const deleteButton = newCard.querySelector('.cards__delete');
//Логика Лайка
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__like_active');
  });
//Логика Удаления
  deleteButton.addEventListener('click', (event) => {
    const selectedDelete = event.target;
    selectedDelete.closest('.cards__item').remove();
  });
  cardName.textContent = name;
  cardImage.src = link;
  cardsGallery.prepend(newCard);
}


// Предзагруженные карточки
const initialCards = [
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

initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  addCard(name, link);
});

