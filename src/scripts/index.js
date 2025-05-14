import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCards, deleteCards, handleLikeCard } from "./card.js";

// DOM элементы
const editPopup = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addButtonProfile = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const submitProfileForm = document.querySelector(".popup__form");
const nameInput = submitProfileForm.querySelector(".popup__input_type_name");
const jobInput = submitProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileDescript = document.querySelector(".profile__description");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Функция для просмотра изображения карточки
const handleImageView = (cardData) => {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
};

// Инициализация карточек
initialCards.forEach((cardDetails) => {
  const cardItems = createCards(
    cardDetails,
    deleteCards,
    handleLikeCard,
    handleImageView
  );
  placesList.append(cardItems);
});

// Обработчик открытия попапа по кнопке редактировать
if (editButton && editPopup) {
  editButton.addEventListener("click", () => {
    fillProfileFormInputs();
    openModal(editPopup);
  });
}

// Обработчик открытия попапа по кнопке +
if (addButtonProfile && newCardPopup) {
  addButtonProfile.addEventListener("click", () => {
    newCardForm.reset();
    // Сделала кнопку неактивной
    const buttonElement = newCardForm.querySelector(".popup__button");
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
    // Сброс сообщения об ошибках
    const inputs = newCardForm.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      hideInputError(newCardForm, input);
    });
    openModal(newCardPopup);
  });
}

// Функция для заполнения полей формы текущими значениями при открытии попапа
const fillProfileFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescript.textContent;
  const inputs = submitProfileForm.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    hideInputError(submitProfileForm, input);
  });
  const buttonElement = submitProfileForm.querySelector(".popup__button");
  toggleButtonState(Array.from(inputs), buttonElement);
};

// Обработчик закрытия попапов
document.querySelectorAll(".popup").forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popupElement);
    }
  });
});

// Функция отправки формы редактирования профиля
const editProfileForm = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileDescript.textContent = jobValue;

  closeModal(editPopup);
};
// Обработчик отправки формы
submitProfileForm.addEventListener("submit", editProfileForm);

// Функция добавления новой карточки
const handleNewCardForm = (evt) => {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCards(
    { name, link },
    deleteCards,
    handleLikeCard,
    handleImageView
  );

  placesList.prepend(newCard);

  newCardForm.reset();

  const buttonElement = newCardForm.querySelector(".popup__button");
  buttonElement.disabled = true;
  buttonElement.classList.add("popup__button_inactive");

  closeModal(newCardPopup);
};

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener("submit", handleNewCardForm);

const showInputError = (submitProfileForm, formInput, errorMessage) => {
  const errorElement = submitProfileForm.querySelector(
    `.${formInput.id}-error`
  );
  formInput.classList.add("popup__input_type_error");
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
};
const hideInputError = (submitProfileForm, formInput) => {
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

const enableValidation = () => {
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

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};
