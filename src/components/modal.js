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

const addPopupCloseListeners = (modal) => {
  const close = modal.querySelector(".popup__close");

  close.addEventListener("click", () => {
    closeModal(modal);
  });

  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal);
    }
  });
};

export { openModal, addPopupCloseListeners, closeModal };
