export { Card, popupCard, popupCardImage, popupCardTitle };
// Card PopUp Basics
const popupCard = document.querySelector('.preview');
const popupCardImage = popupCard.querySelector('.preview__image');
const popupCardTitle = popupCard.querySelector('.preview__caption');

class Card {
  constructor(data, templateSelector, handlePopupImageClick) {
    this._name = data.name;
    this._image = data.link;
    this._cardsTemplate = templateSelector;
    this._handlePopupImageClick = handlePopupImageClick;
  }
//Клонирование темплейта карточки
  _getTemplate() {
    const cardElement = this._cardsTemplate.content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }
//Лайк
  _handleLikeClick() {
    this._like.classList.toggle('cards__like_active');
  }
//Удаление
_handleDeleteClick() {
  this._newCard.remove();
  this._newCard = null;
}
//Установка слушателей: попап карточки, удаление, лайк соответственно
_setEventListeners() {
  this._cardImage.addEventListener('click', () => {
    this._handlePopupImageClick(this._name, this._image);
  });
  this._newCard.querySelector('.cards__delete').addEventListener('click', () => {
    this._handleDeleteClick();
  });
  this._like.addEventListener('click', () => {
    this._handleLikeClick();
  });
}
//Создание карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._like = this._newCard.querySelector('.cards__like');
    this._delete = this._newCard.querySelector('.cards__delete');
    this._newCard.querySelector('.cards__name').textContent = this._name;
    this._cardImage = this._newCard.querySelector('.cards__image');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._image;
    this._setEventListeners();
    return this._newCard;
  }
}
