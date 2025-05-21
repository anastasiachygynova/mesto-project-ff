import "../pages/index.css";
import { openModal, closeModal } from "../components/modal.js";
import { createCards, deleteCards, handleLikeCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
} from "./api.js";

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
const profileImage = document.querySelector(".profile__image");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const avatarPopup = document.querySelector(".popup__type__avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");
const profileSubmitButton = submitProfileForm.querySelector(".popup__button");
const newCardSubmitButton = newCardForm.querySelector(".popup__button");
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

let currentUserId;

// Объект с настройками валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const handleSubmit = (button, loadingText, action) => {
  const originalText = button.textContent;
  button.textContent = loadingText;
  button.disabled = true;

  // Промис для задержки кнопки «Сохранение...»
  const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
  const actionPromise = action();
  Promise.all([actionPromise, minDelay]).finally(() => {
    button.textContent = originalText;
    button.disabled = false;
  });
  return actionPromise;
};

// Функция для загрузки данных
const loadPageData = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;

      if (profileName) {
        profileName.textContent = userData.name || "Имя";
      }
      if (profileDescript) {
        profileDescript.textContent = userData.about || "Занятие";
      }
      if (profileImage) {
        profileImage.style.backgroundImage = `url(${
          userData.avatar || "../images/avatar.jpg"
        })`;
      }
      cards.forEach((cardDetails) => {
        const cardItems = createCards(
          cardDetails,
          deleteCards,
          handleLikeCard,
          handleImageView,
          currentUserId
        );
        placesList.append(cardItems);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
      if (profileName) profileName.textContent = "Имя";
      if (profileDescript) profileDescript.textContent = "Занятие";
      if (profileImage)
        profileImage.style.backgroundImage = "url(../images/avatar.jpg)";
    });
};

document.addEventListener("DOMContentLoaded", loadPageData);

// Функция для просмотра изображения карточки
const handleImageView = (cardData) => {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
};

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
    clearValidation(newCardForm, validationConfig);
    openModal(newCardPopup);
  });
}

// Функция для заполнения полей формы текущими значениями при открытии попапа
const fillProfileFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescript.textContent;
  clearValidation(submitProfileForm, validationConfig);
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

  const userData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  handleSubmit(profileSubmitButton, "Сохранение...", () =>
    updateUserInfo(userData)
  ).then((userData) => {
    profileName.textContent = userData.name;
    profileDescript.textContent = userData.about;
    closeModal(editPopup);
  })
  .catch((error) => {
    console.error("Ошибка при обновлении профиля:", error);
  });
};

// Обработчик отправки формы
submitProfileForm.addEventListener("submit", editProfileForm);

// Функция добавления новой карточки
const handleNewCardForm = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  // Добавить данные на сервер
  handleSubmit(newCardSubmitButton, "Сохранение...", () => addNewCard(cardData))
    .then((card) => {
      const newCard = createCards(
        card,
        deleteCards,
        handleLikeCard,
        handleImageView,
        currentUserId
      );

      placesList.prepend(newCard);
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closeModal(newCardPopup);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    });
};

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener("submit", handleNewCardForm);

// Включение валидации форм
enableValidation(validationConfig);

// Обработчик клика по аватару
profileImage.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

// Функция отправки формы смены аватара
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const avatarUrl = avatarLinkInput.value;

  handleSubmit(avatarSubmitButton, "Сохранение...", () =>
    updateAvatar(avatarUrl)
  )
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка при смене аватара:", error);
    });
};

// Обработчик отправки формы смены аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
