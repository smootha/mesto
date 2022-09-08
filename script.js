// Like Logics
let likeButton = document.querySelectorAll('.cards__like');

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function() {
    likeButton[i].classList.toggle('cards__like_active');
  })
}

// PopUp Basics
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.form__close-button');
let popupItems = document.querySelectorAll('.pop-up');

let formElement = document.querySelector('.form');

let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__job');

let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');
nameInput.value = userName.textContent;
jobInput.value = userJob.textContent;


// PopUp Submit
function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  userName.textContent = newName;
  userJob.textContent = newJob;
  for (let i = 0; i < popupItems.length; i++) {
    popupItems[i].classList.add('pop-up_hidden');
  }
}

formElement.addEventListener('submit', formSubmitHandler);

// PopUp Recall
editButton.addEventListener('click', function() {
  for (let i = 0; i < popupItems.length; i++) {
    popupItems[i].classList.remove('pop-up_hidden');
  }
});

// PopUp Close
closeButton.addEventListener('click', function() {
  for (let i = 0; i < popupItems.length; i++) {
    popupItems[i].classList.add('pop-up_hidden');
  }
})
