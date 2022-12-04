export class Card {
  constructor({
              data,
              userId,
              handleCardClick,
              handleDeleteClick,
              handleLikeClick
              },
              templateSelector) {
    this._obj = data;
    this._name = data.name;
    this._image = data.link;
    this._id = data._id;
    this._userId = userId;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
//Клонирование темплейта карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }
//Установка слушателей: попап карточки, удаление, лайк соответственно
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._obj);
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._id, this._newCard);
    });
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardLike);
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
    this._newCard.querySelector('.cards__like-counter').textContent = this._likes.length;
    this._cardDelete = this._newCard.querySelector('.cards__delete');
    this._setEventListeners();
    return this._newCard;
  }
}
