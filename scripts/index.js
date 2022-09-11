// PopUp Basics
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popupItem = document.querySelector('.popup');

let formElement = document.querySelector('.form');

let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__job');

let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');

// PopUp Toggler Function
function togglePopup() {
  popupItem.classList.toggle('popup_opened');
// Поля заполняюься при открытии
  if (popupItem.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  }
}

// PopUp Submit
function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  userName.textContent = newName;
  userJob.textContent = newJob;
  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// PopUp Open
editButton.addEventListener('click', togglePopup);

// PopUp Close
closeButton.addEventListener('click', togglePopup);
