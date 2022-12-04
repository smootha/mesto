export class Api {
  constructor({ url, headers }) {
    this._url = url,
    this._headers = headers
  }
// Функция проверки ответа с сервера
_checkResponseStatus(response) {
  return response.ok ?
    response.json()
    : Promise.reject(`Error: ${response.status} ${response.statusText}`);
}
// Получение данных пользователя с сервера
  recieveUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
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
      .then(this._checkResponseStatus);
  }
// Отправление аватара пользователя на сервер
  sendNewAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponseStatus);
  }
// Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }
// Отправка новой карточки на сервер
  sendNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponseStatus);
  }
// Удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

// Добавление лайка
  addLikes() {

  }
// Удаление лайка
  deleteLike() {

  }
}
