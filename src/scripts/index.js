import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";

// DOM элементы
const editPopup = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addButtonProfile = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescript = document.querySelector(".profile__description");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Функция создания карточек
function createCards(cardDetails, deleteCallback, likeCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItems = cardTemplate.querySelector(".card").cloneNode(true);
  const imageCard = cardItems.querySelector(".card__image");
  const buttonDelete = cardItems.querySelector(".card__delete-button");
  const cardTitle = cardItems.querySelector(".card__title");
  const likeButton = cardItems.querySelector(".card__like-button");

  cardTitle.textContent = cardDetails.name;
  imageCard.alt = cardDetails.name;
  imageCard.src = cardDetails.link;

  buttonDelete.addEventListener("click", (event) => {
    deleteCallback(cardItems);
  });

  likeButton.addEventListener("click", () => {
    likeCallback(likeButton);
  });

  return cardItems;
}

function deleteCards(cardItems) {
  cardItems.remove();
}

// Инициализация карточек
initialCards.forEach((cardDetails) => {
  const cardItems = createCards(cardDetails, deleteCards, handleLikeCard);
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

// Функция для заполнения полей формы текущими значениями при открытии попапа
function fillProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescript.textContent;
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

// Функция отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileDescript.textContent = jobValue;

  closeModal(editPopup);
}
// Обработчик отправки формы
formElement.addEventListener("submit", handleFormSubmit);

// Функция добавления новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCards({ name, link }, deleteCards, handleLikeCard);

  placesList.prepend(newCard);

  newCardForm.reset();

  closeModal(newCardPopup);
}

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Функция обработки лайка
function handleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
