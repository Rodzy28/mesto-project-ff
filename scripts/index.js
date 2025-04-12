// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = arrayCards => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardTitle.textContent = arrayCards.name;
  cardImage.src = arrayCards.link;
  cardImage.alt = `На фото ${arrayCards.name}`;
  
  cardDeleteButton.addEventListener('click', deleteCard);

  return card;
}

// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardList.append(createCard(item));
});
