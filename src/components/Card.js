export class Card {
  constructor({
              data,
              userId,
              handleCardClick,
              handleDeleteClick,
              handleLikeClick,
              handleDislikeClick
              },
              templateSelector) {
    this._obj = data;
    this._name = data.name;
    this._image = data.link;
    this._id = data._id;
    this._ownerData = data.owner;
    this._ownerId = this._ownerData._id;
    this._userId = userId;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._isLiked = false;
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
    if (this._ownerId == this._userId) {
      this._cardDelete.addEventListener('click', () => {
        this._handleDeleteClick(this._id, this._newCard);
      });
    }
    this._cardLike.addEventListener('click', () => {
      this._cardLike.classList.toggle('cards__like_active');
      if(this._isLiked) {
        this._handleDislikeClick(this._id);
        this._isLiked = false;
      } else {
        this._handleLikeClick(this._id);
        this._isLiked = true;
      }
    });
  }
  likeCount(likes) {
    this._likeCounter.textContent = likes;
  }
//Создание карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.cards__name').textContent = this._name;
    this._cardImage = this._newCard.querySelector('.cards__image');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._image;
    this._cardLike = this._newCard.querySelector('.cards__like');
//Расстановка лайков при загрузке страницы
    if(this._likes.some(user => user._id === this._userId)) {
      this._isLiked = true;
      this._cardLike.classList.add('cards__like_active');
    }
    this._likeCounter = this._newCard.querySelector('.cards__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._cardDelete = this._newCard.querySelector('.cards__delete');
    if (this._ownerId !== this._userId) {
      this._cardDelete.remove();
    }
    this._setEventListeners();
    return this._newCard;
  }
}
