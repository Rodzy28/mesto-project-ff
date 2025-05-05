const createCard = (cardData, deleteCard, likeCard, viewImage) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `На фото ${cardData.name}`;

  cardDeleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", viewImage);

  return card;
};

const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
