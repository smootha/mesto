import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, cardTitle, cardImage) {
    super(popupSelector);
    this._cardTitle = cardTitle;
    this._cardImage = cardImage;
  }
  open({ name, link }) {
    this._cardTitle.textContent = name;
    this._cardImage.alt = name;
    this._cardImage.src = link;
    super.open();
  }
}
