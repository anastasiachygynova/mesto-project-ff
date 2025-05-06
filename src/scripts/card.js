// Функция создания карточек
export const createCards = (
  cardDetails,
  deleteCallback,
  likeCallback,
  imageViewCallback
) => {
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

  if (imageViewCallback) {
    imageCard.addEventListener("click", () => {
      imageViewCallback(cardDetails);
    });
  }

  return cardItems;
};

export const deleteCards = (cardItems) => {
  cardItems.remove();
};

// Функция обработки лайка
export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};
