function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
    });
  });
}

function isValid(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, validationConfig);
  } else {
    hideInputError(inputElement, validationConfig);
  }
}

function showInputError(inputElement, validationConfig) {
  inputElement.classList.add(validationConfig.inputErrorClass);
}

function hideInputError(inputElement, validationConfig) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

export { enableValidation };
