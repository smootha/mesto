// PopUp Basics
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupItem = document.querySelector('.popup');

const formElement = document.querySelector('.form');

const nameInput = document.querySelector('.form__input_data_name');
const jobInput = document.querySelector('.form__input_data_job');

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

// PopUp Toggler Function
function togglePopup() {
  popupItem.classList.toggle('popup_opened');
// Поля заполняются при открытии
  if (popupItem.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  }
}

// PopUp Submit
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  togglePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

// PopUp Open
editButton.addEventListener('click', togglePopup);

// PopUp Close
closeButton.addEventListener('click', togglePopup);

// Добавление карточек при загрузке страницы
const cardsGallery = document.querySelector('.cards');
const card = document.querySelector('.cards__template').content;

function addCard(name, link) {
  const newCard = card.querySelector('.cards__item').cloneNode(true);
  const cardName = newCard.querySelector('.cards__name');
  const cardImage = newCard.querySelector('.cards__image');
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

// Кнопка Like
const likeButtons = document.querySelectorAll('.cards__like');
likeButtons.forEach((like) => {
  like.addEventListener('click', function (event) {
    const likeButton = event.target;
    likeButton.classList.toggle('cards__like_active');
  });
});

// Кнопка Delete
const deleteButtons = document.querySelectorAll('.cards__delete');
deleteButtons.forEach((item) => {
  item.addEventListener('click', function (event) {
    const deleteButton = event.target;
    const deleteCard = deleteButton.closest('.cards__item');
    deleteCard.remove();
  });
});
