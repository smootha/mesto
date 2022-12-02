export class Api {
  constructor({ url, headers }) {
    this._url = url,
    this._headers = headers
  }
// Получение данных пользователя с сервера
  recieveUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
      .then((resp) => {
        return resp.ok ?
          resp.json()
          : Promise.reject(`Error: ${resp.status} ${resp.statusText}`);
      })
  }
// Отправление данных пользователя на сервер
  sendUserData(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((resp) => {
        return resp.ok ?
          resp.json()
          : Promise.reject(`Error: ${resp.status} ${resp.statusText}`);
      });
  }

  sendNewAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((resp) => {
        return resp.ok ?
          resp.json()
          : Promise.reject(`Error: ${resp.status} ${resp.statusText}`);
      });
  }

  recieveCardsData() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then((resp) => {
        return resp.ok ?
          resp.json()
          : Promise.reject(`Error: ${resp.status} ${resp.statusText}`);
      })
  }

  sendNewCard() {

  }

  deleteCard() {

  }


  countLikes() {

  }

  toggleLike() {

  }
}
