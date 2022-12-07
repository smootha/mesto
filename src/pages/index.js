import './index.css';
import {
  logError
} from '../utils/utils.js'
import {
  avatarOverlay,
  popupEditProfile,
  buttonEditProfile,
  popupEditAvatar,
  popupAddCard,
  buttonAddCard,
  formEditAvatar,
  formElementAdd,
  validationObject,
  apiConfig
  } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';

// Добавляю класс для управления данными пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});
// Попап редактирования профиля
const popupProfile = new PopupWithForm(editProfileSubmitHandler, '.edit-profile');
popupProfile.setEventListeners();
// Попап редактирования аватара
const popupAvatar = new PopupWithForm(editAvatarSubmitHandler, '.edit-avatar');
popupAvatar.setEventListeners();
// Попап подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(deleteCardSubmitHandler, '.delete-card');
popupWithConfirmation.setEventListeners();
// Попап просмотра картинок
const popupPreview = new PopupWithImage('.preview');
popupPreview.setEventListeners();
// Создание валидации
const profileFormValidation = new FormValidator(validationObject, popupEditProfile);
const avatarFormValidation = new FormValidator(validationObject, popupEditAvatar);
const cardFormValidation = new FormValidator(validationObject, popupAddCard);
// Добавление API
const api = new Api(apiConfig);
// Ф-ция создания карточки
function createCard(data, userId) {
  const card = new Card({ data: data,
                          userId: userId,
                          handleCardClick: ({name, link}) => {
                            popupPreview.open({ name, link });
                          },
                          handleDeleteClick: (cardId, card) => {
                            popupWithConfirmation.open(cardId, card);
                          },
                          handleLikeClick: (id) => {
                            api.addLike(id)
                              .then((res) => {
                                card.likeCount(res.likes.length);
                              })
                              .catch(logError);
                          },
                          handleDislikeClick: (id) => {
                            api.deleteLike(id)
                              .then((res) => {
                                card.likeCount(res.likes.length);
                              })
                              .catch(logError);
                          }
                        }, '.cards__template');
  const newCardElement = card.generateCard();
  return newCardElement;
}
// Callback сабмита измненения Профиля
function editProfileSubmitHandler({name, about}) {
  popupProfile.enableLoadingStatus(true);
  api.sendUserData(name, about)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupProfile.close();
    })
    .catch(logError)
    .finally(() => {
      popupProfile.enableLoadingStatus(false);
    });
}
// Callback сабмита изменения Аватара
function editAvatarSubmitHandler({ avatar }) {
  popupAvatar.enableLoadingStatus(true);
  api.sendNewAvatar(avatar)
    .then((avatar) => {
      userInfo.setUserAvatar(avatar);
      popupAvatar.close();
    })
    .catch(logError)
    .finally(() => {
      popupAvatar.enableLoadingStatus(false);
    });
}
// Callback сабмита подтверждения удаления
function deleteCardSubmitHandler(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.remove();
    })
    .then(() => {
      popupWithConfirmation.close();
    })
    .catch(logError);
}
//Изначальная загрузка данных пользователя и карточек для отрисовки страницы
api.getInitialData()
  .then((data) => {
    const [userData, initialCards] = data;
    const userId = userData._id;
// Класс добавления карточек в определенную секцию
    const cardsList = new Section({
      data: initialCards,
      renderer: (item) => {
        cardsList.setItems(createCard(item, userId));
      }
    }, '.cards');
// Попап добавления карточек
    const popupCards = new PopupWithForm(addCardSubmitHandler, '.add-card');
    popupCards.setEventListeners();
// Callback сабмита создания карты
    function addCardSubmitHandler({place, url}) {
      popupCards.enableLoadingStatus(true);
      const card = {
        name: place,
        link: url
      }
      api.sendNewCard(card)
        .then((card) => {
          cardsList.setItems(createCard(card, userId));
          popupCards.close();
        })
        .catch(logError)
        .finally(() => {
          popupCards.enableLoadingStatus(false);
        });
    }
//Установка аватара и данных пользователя на странице
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
//Рендер подгруженых карточек
    cardsList.renderItems();
// Слушатель на открытие popup изменения данных пользователя
    buttonEditProfile.addEventListener('click', () => {
      profileFormValidation.resetClosedForm();
      popupProfile.setInputValues(userInfo.getUserInfo());
      popupProfile.open();
    });
// Слушатель на открытие popup изменения аватара пользователя
    avatarOverlay.addEventListener('click', () => {
      formEditAvatar.reset();
      avatarFormValidation.resetClosedForm();
      popupAvatar.open();
    });
// Слушатель на открытие popup добавления карточки
    buttonAddCard.addEventListener('click', () => {
      formElementAdd.reset();
      cardFormValidation.resetClosedForm();
      popupCards.open();
    });
// Запуск валидаций
    profileFormValidation.enableValidation();
    avatarFormValidation.enableValidation();
    cardFormValidation.enableValidation();
  })
    .catch(logError);
