export class Card {
  constructor(name, image) {
    this._name = name;
    this._image = image;
  }
  _getTemplate() {
    const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._newCard.querySelector('.cards__like').classList.toggle('cards__like_active');
  }
  _setLikeEventListener() {
    this._newCard.querySelector('.cards__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.cards__name').textContent = this._name;
    this._newCard.querySelector('.cards__image').alt = this._name;
    this._newCard.querySelector('.cards__image').src = this._image;
    this._setLikeEventListener();
    return this._newCard;
  }
}



/*
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
*/
