export class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  setItems(element) {
    this._container.prepend(element);
  }
}
