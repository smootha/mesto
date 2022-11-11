import { Card } from "./Card.js";

export class Section {
  constructor( items, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => {
      const card = new Card(item);
      const newCard = card.generateCard();
      this.setItems(newCard);
    });
  }
  setItems(element) {
    this._container.prepend(element);
  }
}
