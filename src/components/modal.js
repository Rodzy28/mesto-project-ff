const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
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

  modal.addEventListener("mousedown", (e) => {
    if (e.target === e.currentTarget) {
      closeModal(modal);
    }
  });
};

export { openModal, closePopupButton };
