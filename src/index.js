import './styles/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, addPopupCloseListeners, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards } from './components/api.js';

const popupEditUser = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const formElementUser = document.forms['edit-profile'];
const nameInput = formElementUser.elements.name;
const jobInput = formElementUser.elements.description;
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
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
Promise.all([getInitialCards()]).then((res) => {
  console.log(res);
});

profileButton.addEventListener('click', () => {
  clearValidation(popupEditUser, validationConfig);
  openModal(popupEditUser);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

cardButton.addEventListener('click', () => {
  clearValidation(popupAddCard, validationConfig);
  formElementCard.reset();
  openModal(popupAddCard);
});

addPopupCloseListeners(popupEditUser);
addPopupCloseListeners(popupAddCard);
addPopupCloseListeners(popupImage);

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeModal(popupEditUser);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    { name: placeInput.value, link: linkInput.value },
    deleteCard,
    likeCard,
    viewImage
  );

  cardList.prepend(newCard);
  closeModal(popupAddCard);
}

function viewImage(evt) {
  const imageContent = popupImage.querySelector('.popup__image');
  const imageCaption = popupImage.querySelector('.popup__caption');
  imageContent.src = evt.target.src;
  imageContent.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;
  openModal(popupImage);
}

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard, likeCard, viewImage));
});

formElementUser.addEventListener('submit', handleUserFormSubmit);
formElementCard.addEventListener('submit', handleCardFormSubmit);
