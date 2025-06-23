debugger ;
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = document.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = document.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else if (inputElement.value.trim() == "") {
    showInputError(formElement, inputElement, "Enter valid value",config);
    disableButton(buttonElement);
  } else {
    hideInputError(formElement, inputElement,config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
};

const disableButton = (buttonEl) => {
  buttonEl.classList.add("button_inactive");
  buttonEl.disabled = true;
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  console.log("buttonElement", buttonElement);

  toggleButtonState(inputList, buttonElement,config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  console.log(config.formSelector);
  const formList = document.querySelectorAll(config.formSelector);
  console.log("fomlist", formList);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

window.settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
};

enableValidation(settings);
