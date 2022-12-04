export class Section {
  constructor({ renderer }, containerSelector) {

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(element) {
    this._container.prepend(element);
  }
}
