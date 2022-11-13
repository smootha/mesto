import { popupPreview } from '../pages/index.js';

export class Card {
  constructor({ name, link }) {
    this._name = name;
    this._image = link;
  }
//Клонирование темплейта карточки
  _getTemplate() {
    const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }
//Лайк
  _handleLikeClick() {
    this._newCard.querySelector('.cards__like').classList.toggle('cards__like_active');
  }
//Удаление
  _handleDeleteClick() {
  this._newCard.remove();
  }
//Открытие Попапа
  _handlePopupImageClick() {
    popupPreview.open({ name: this._name, link: this._image });
  }
//Установка слушателей: попап карточки, удаление, лайк соответственно
  _setEventListeners() {
    this._newCard.querySelector('.cards__image').addEventListener('click', () => {
      this._handlePopupImageClick();
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
    this._newCard.querySelector('.cards__name').textContent = this._name;
    this._newCard.querySelector('.cards__image').alt = this._name;
    this._newCard.querySelector('.cards__image').src = this._image;
    this._setEventListeners();
    return this._newCard;
  }
}
