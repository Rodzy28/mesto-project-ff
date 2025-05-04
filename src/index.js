import "./styles/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closePopupButton } from "./components/modal.js";

const popupEditUser = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileButton = document.querySelector(".profile__edit-button");
const cardButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".places__list");

profileButton.addEventListener("click", () => {
  openModal(popupEditUser);
  closePopupButton(popupEditUser);
});

cardButton.addEventListener("click", () => {
  openModal(popupAddCard);
  closePopupButton(popupAddCard);
});

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard));
});
