import { deleteCardServer, addLike, removeLike } from "./api.js";

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
  const likeCountElement = cardElement.querySelector(".card__likes-counter");

  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes ? cardData.likes.length : 0;

  const isLikedByCurrentUser = cardData.likes.some(
    (like) => like._id === userId
  );

  if (isLikedByCurrentUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

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

  // Обработчик для кнопки лайка
  if (likeButton) {
    likeButton.addEventListener("click", () => {
      handleLikeCard(likeButton, cardData._id, likeCountElement);
    });
  }

  return cardElement;
};
// Функция удаления карточек
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
export const handleLikeCard = (likeButton, cardId, likeCountElement) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // Проверяем, активен ли лайк сейчас

  const likeAction = isLiked ? removeLike : addLike;

  likeAction(cardId)
    .then((updatedCard) => {
      likeCountElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.error(
        `Ошибка при ${isLiked ? "снятии" : "постановке"} лайка для карточки ${cardId}:`,
        error
      );
    });
};
