export class Card {
  constructor(data, templateSelector, callbackPreview, callbackDelete) {
    this._obj = data;
    this._name = data.name;
    this._image = data.link;
    this._id = data.id;
    this._templateSelector = templateSelector;
    this._handleCardClick = callbackPreview;
    this._handleDeleteClick = callbackDelete;
  }
//Клонирование темплейта карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }
//Лайк
  _handleLikeClick() {
    this._cardLike.classList.toggle('cards__like_active');
  }
//Удаление
  /*_handleDeleteClick() {

  this._newCard.remove();
  }*/
//Установка слушателей: попап карточки, удаление, лайк соответственно
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._obj);
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }
//Создание карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.cards__name').textContent = this._name;
    this._cardImage = this._newCard.querySelector('.cards__image');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._image;
    this._cardLike = this._newCard.querySelector('.cards__like');
    this._cardDelete = this._newCard.querySelector('.cards__delete');
    this._setEventListeners();
    return this._newCard;
  }
}
