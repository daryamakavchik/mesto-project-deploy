export const enableValidation = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);

  [...forms].forEach((form) => {
      setEventListeners(form, settings);
  });
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(buttonElement, formElement.checkValidity(), settings);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
          checkInputValidity(formElement, inputElement, settings);

          toggleButtonState(buttonElement, formElement.checkValidity(), settings);
      });
  });
};

const checkInputValidity = (formElement, inputElement, settings) => {
  const isInputValid = inputElement.validity.valid;

  if (!isInputValid) {
      showInputError(formElement, inputElement, settings);
  } else {
      hideInputError(formElement, inputElement, settings);
  }
};

const toggleButtonState = (buttonElement, isActive = false, settings) => {
  if (isActive) {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
  } else {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
  }
};

const showInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};
