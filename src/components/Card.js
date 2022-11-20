export class Card {
  constructor(data, callback) {
    this._obj = data;
    this._name = data.name;
    this._image = data.link;
    this._handleCardClick = callback;
  }
//Клонирование темплейта карточки
  _getTemplate() {
    const cardElement = this._templateElement.content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }
//Лайк
  _handleLikeClick() {
    this._like.classList.toggle('cards__like_active');
  }
//Удаление
  _handleDeleteClick() {
  this._newCard.remove();
  }
//Установка слушателей: попап карточки, удаление, лайк соответственно
  _setEventListeners() {
    this._newCard.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardClick(this._obj);
    });
    this._newCard.querySelector('.cards__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._newCard.querySelector('.cards__like').addEventListener('click', () => {
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
