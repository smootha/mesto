export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
