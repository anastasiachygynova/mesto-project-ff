import { deleteCardServer } from "./api.js";

// Функция создания карточек
export const createCards = (
  cardData,
  deleteCards,
  handleLikeCard,
  handleImageView,
  userId
) => {
  

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => handleImageView(cardData));

  const isOwner = cardData.owner._id === userId;
  
  if (!isOwner) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    if (deleteButton) {
      deleteButton.style.display = "none";
    }
  }

  if (isOwner) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        deleteCards(cardElement, cardData._id);
      });
    }
  }

  return cardElement;
};

export const deleteCards = (cardElement, cardId) => {
  deleteCardServer(cardId)
    .then(() => {
      console.log("Карточка удалена с сервера");
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
};

// Функция обработки лайка
export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};
