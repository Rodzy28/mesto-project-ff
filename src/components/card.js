const createCard = (cardData, deleteCard) => {
  const cardTemplate = document.querySelector("#card-template").content;
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

const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

export { createCard, deleteCard };
