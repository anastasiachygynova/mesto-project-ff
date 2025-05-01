// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from '../components/modal.js';

// DOM элементы
const editPopup = document.querySelector('.popup_type_edit');
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');


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

// Обработчик открытия попапа на кнопку редактирования
editButton.addEventListener('click', () => {
  openModal(editPopup);
});