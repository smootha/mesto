import { popupCardTitle, popupCardImage } from "../utils/constants.js";
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({ name, link }) {
    popupCardTitle.textContent = name;
    popupCardImage.alt = name;
    popupCardImage.src = link;
    super.open();
  }
}
