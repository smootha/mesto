import { popupCardTitle, popupCardImage } from "../utils/constants.js";
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(newData) {
    popupCardTitle.textContent = newData.name;
    popupCardImage.alt = newData.name;
    popupCardImage.src = newData.link;
    super.open();
  }
}
