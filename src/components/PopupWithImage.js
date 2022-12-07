import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardTitle = this._popup.querySelector('.preview__caption');
    this._cardImage = this._popup.querySelector('.preview__image');
  }
  open({ name, link }) {
    this._cardTitle.textContent = name;
    this._cardImage.alt = name;
    this._cardImage.src = link;
    super.open();
  }
}
