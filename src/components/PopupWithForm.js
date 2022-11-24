import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._callback = callback;
    this._inputList = this._form.querySelectorAll('.form__input');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setInputValues(data) {

  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
