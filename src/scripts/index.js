// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";

// DOM элементы
const editPopup = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addButtonProfile = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// Функция создлания карточек 
function createCards(cardDetails, deleteCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItems = cardTemplate.querySelector(".card").cloneNode(true);
  const imageCard = cardItems.querySelector(".card__image");
  const buttonDelete = cardItems.querySelector(".card__delete-button");
  const cardTitle = cardItems.querySelector(".card__title");

  cardTitle.textContent = cardDetails.name;
  imageCard.alt = cardDetails.name;
  imageCard.src = cardDetails.link;

  buttonDelete.addEventListener("click", (event) => {
    deleteCallback(cardItems);
  });

  return cardItems;
}

function deleteCards(cardItems) {
  cardItems.remove();
}

// Инициализация карточек
initialCards.forEach((cardDetails) => {
  const cardItems = createCards(cardDetails, deleteCards);
  placesList.append(cardItems);
});

// Обработчик открытия попапа по кнопке редактировать
if (editButton && editPopup) {
  editButton.addEventListener("click", () => {
    openModal(editPopup);
  });
}
// Обработчик открытия попапа по кнопке +
if (addButtonProfile && newCardPopup) {
  addButtonProfile.addEventListener("click", () => {
    openModal(newCardPopup);
  });
}

// Функция открытия попапа при нажатии на картинку
function openPopupImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupTypeImage.querySelector(".popup__image").src = evt.target.src;
    popupTypeImage.querySelector(".popup__image").alt = evt.target.alt;
    popupTypeImage.querySelector(".popup__caption").textContent =
      evt.target.alt;
    openModal(popupTypeImage);
  }
}
// Обработчик открытия попапа при нажатии на картинку
document.addEventListener("click", openPopupImage);

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

nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

function handleFormSubmit(evt) {
  evt.preventDefault();
}

formElement.addEventListener("submit", handleFormSubmit);
