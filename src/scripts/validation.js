const showInputError = (submitProfileForm, formInput, errorMessage) => {
  const errorElement = submitProfileForm.querySelector(
    `.${formInput.id}-error`
  );
  formInput.classList.add("popup__input_type_error");
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
};
export const hideInputError = (submitProfileForm, formInput) => {
  const errorElement = submitProfileForm.querySelector(
    `.${formInput.id}-error`
  );
  formInput.classList.remove("popup__input_type_error");
  if (errorElement) {
    errorElement.textContent = "";
  }
};

const isValid = (submitProfileForm, formInput) => {
  formInput.setCustomValidity("");
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  }
  if (!formInput.validity.valid) {
    showInputError(submitProfileForm, formInput, formInput.validationMessage);
  } else {
    hideInputError(submitProfileForm, formInput);
  }
};

const setEventListeners = (submitProfileForm) => {
  const inputList = Array.from(
    submitProfileForm.querySelectorAll(".popup__input")
  );
  const buttonElement = submitProfileForm.querySelector(".popup__button");

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(submitProfileForm, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((submitProfileForm) => {
    setEventListeners(submitProfileForm);
  });
};

enableValidation();

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};
