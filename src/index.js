import './styles/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, addPopupCloseListeners, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getInitialCards,
  getUserInfo,
  setUserInfo,
  postNewCard,
  removeCard,
  addLike,
  deleteLike,
} from './components/api.js';

const popupEditUser = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
const confirmButton = popupConfirmDelete.querySelector('.popup__button');
const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const formElementUser = document.forms['edit-profile'];
const nameInput = formElementUser.elements.name;
const aboutInput = formElementUser.elements.description;
const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');
const formElementCard = document.forms['new-place'];
const placeInput = formElementCard.elements['place-name'];
const linkInput = formElementCard.elements['link'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

let userId;

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, userInfo]) => {
    userName.textContent = userInfo.name;
    userAbout.textContent = userInfo.about;
    userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    cards.forEach((card) => {
      cardList.append(createCard(card, handleDeleteCard, handleLikeCard, viewImage, userId));
    });
  })
  .catch((err) => {
    console.log(err);
  });

profileButton.addEventListener('click', () => {
  clearValidation(popupEditUser, validationConfig);
  openModal(popupEditUser);
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
});

cardButton.addEventListener('click', () => {
  clearValidation(popupAddCard, validationConfig);
  formElementCard.reset();
  openModal(popupAddCard);
});

addPopupCloseListeners(popupEditUser);
addPopupCloseListeners(popupAddCard);
addPopupCloseListeners(popupImage);
addPopupCloseListeners(popupConfirmDelete);

// Обработчик юзера
function handleUserFormSubmit(evt) {
  evt.preventDefault();
  setUserInfo(nameInput.value, aboutInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userAbout.textContent = res.about;
      closeModal(popupEditUser);
    })
    .catch((err) => console.log(err));
}

// Обработчик создания карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  postNewCard(placeInput.value, linkInput.value)
    .then((card) => {
      const newCard = createCard(card, handleDeleteCard, handleLikeCard, viewImage, userId);
      cardList.prepend(newCard);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Обработчик удаления карточки
function handleDeleteCard(evt, cardId) {
  openModal(popupConfirmDelete);
  confirmButton.addEventListener('click', () => {
    removeCard(cardId)
      .then(() => {
        closeModal(popupConfirmDelete);
        deleteCard(evt);
      })
      .catch((err) => console.log(err));
  });
}

// Обработчик лайков
function handleLikeCard(evt, cardData) {
  const checkLike = evt.target.classList.contains('card__like-button_is-active')
    ? deleteLike
    : addLike;

  checkLike(cardData._id)
    .then((res) => {
      evt.target.closest('.card').querySelector('.card__like-counter').textContent =
        res.likes.length;
      likeCard(evt);
    })
    .catch((err) => console.log(err));
}

function viewImage(evt) {
  const imageContent = popupImage.querySelector('.popup__image');
  const imageCaption = popupImage.querySelector('.popup__caption');
  imageContent.src = evt.target.src;
  imageContent.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;
  openModal(popupImage);
}

formElementUser.addEventListener('submit', handleUserFormSubmit);
formElementCard.addEventListener('submit', handleCardFormSubmit);
