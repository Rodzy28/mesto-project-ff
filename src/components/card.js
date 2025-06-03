const createCard = (cardData, handleDeleteCard, handleLikeCard, viewImage, userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCounter = card.querySelector('.card__like-counter');

  // Заполнение данных карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `На фото ${cardData.name}`;
  cardLikeCounter.textContent = cardData.likes.length;

  if (userId !== cardData.owner._id) {
    cardDeleteButton.remove();
  }

  cardDeleteButton.addEventListener('click', (evt) => {
    handleDeleteCard(evt, cardData._id)
  })

  // Проверка есть ли лайк пользователя
  cardData.likes.forEach((like) => {
    if (like._id === userId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  });

  // Ставим/убираем лайк
  cardLikeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt, cardData);
  });

  cardImage.addEventListener('click', viewImage);

  return card;
};

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
};

const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, likeCard };
