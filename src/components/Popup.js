export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.close-button');
    this._boundEscHandler = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._boundEscHandler);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._boundEscHandler);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => { this.close(); });
    this._popup.addEventListener(('click'), evt => {
      if (evt.target.classList.contains('popup')) {
      this.close();
      }
    });
  }

}
