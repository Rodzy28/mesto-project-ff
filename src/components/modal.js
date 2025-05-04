const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
};

const closePopupButton = (modal) => {
  const close = modal.querySelector(".popup__close");

  close.addEventListener("click", () => {
    closeModal(modal);
  });

  // элементПопапа.addEventListener("mousedown", (event) => {
  //   // если event.target содержит класс "popup", то закрываем
  // });
};

export { openModal, closePopupButton };
