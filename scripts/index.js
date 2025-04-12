// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardElement = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(arrayCards) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDelete = card.querySelector('.card__delete-button');

  cardTitle.textContent = arrayCards.name;
  cardImage.src = arrayCards.link;
  cardImage.alt = `На фото ${arrayCards.name}`;
  
  cardDelete.addEventListener('click', deleteButton);

  return card;
}

// @todo: Функция удаления карточки
const deleteButton = (evt) => {
  evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardElement.append(createCard(item));
});
