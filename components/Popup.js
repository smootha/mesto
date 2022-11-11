export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.close-button');
  }
  open() {
    this._popup.classList.add('popup_opened');
  }
  close() {
    this._popup.classList.remove('popup_opened');
  }
/*  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close);
  }
*/
}
