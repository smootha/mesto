import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._callback = callback;
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._id, this._card);
    });
  }
}
