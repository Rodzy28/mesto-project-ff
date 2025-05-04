import "./styles/index.css";
import { initialCards } from "./cards.js";
import { openModal, closePopupButton } from "./components/modal.js";

const popupEditUser = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileButton = document.querySelector(".profile__edit-button");
const cardButton = document.querySelector(".profile__add-button");


profileButton.addEventListener("click", () => {
  openModal(popupEditUser);
  closePopupButton(popupEditUser);
});

cardButton.addEventListener("click", () => {
  openModal(popupAddCard);
  closePopupButton(popupAddCard);
});

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (cardData, deleteCard) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `На фото ${cardData.name}`;

  cardDeleteButton.addEventListener("click", deleteCard);

  return card;
};

// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard));
});
