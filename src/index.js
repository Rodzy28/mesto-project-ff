import "./styles/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closePopupButton, closeModal } from "./components/modal.js";

const popupEditUser = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
// const popupImage = document.querySelector(".popup_type_image");
const profileButton = document.querySelector(".profile__edit-button");
const cardButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".places__list");
const formElementUser = document.forms["edit-profile"];
const nameInput = formElementUser.elements.name;
const jobInput = formElementUser.elements.description;
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");
const formElementCard = document.forms["new-place"];
const placeInput = formElementCard.elements["place-name"];
const linkInput = formElementCard.elements["link"];

profileButton.addEventListener("click", () => {
  openModal(popupEditUser);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  closePopupButton(popupEditUser);
});

cardButton.addEventListener("click", () => {
  formElementCard.reset();
  openModal(popupAddCard);
  closePopupButton(popupAddCard);
});

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
    likeCard
  );
  closeModal(popupAddCard);
  cardList.prepend(newCard);
}

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard, likeCard));
});

formElementUser.addEventListener("submit", handleUserFormSubmit);
formElementCard.addEventListener("submit", handleCardFormSubmit);
