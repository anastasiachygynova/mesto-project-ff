export const initialCards = [
    {
      name: "Вена. Австрия",
      link: "https://images.unsplash.com/photo-1743102821158-314fc4c16d32?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Санторини. Греция",
      link: "https://images.unsplash.com/photo-1743427533188-d15184903f63?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Амстердам. Нидерланды",
      link: "https://images.unsplash.com/photo-1742054294226-86d430d25ae5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Камчатка. Россия",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Рим. Италия",
      link: "https://images.unsplash.com/photo-1742161627294-2c46bbd9b7e1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Ницца. Франция",
      link: "https://images.unsplash.com/photo-1740896552919-6500379b85e2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];


// Функция создания карточек
export const createCards = (cardDetails, deleteCallback, likeCallback, imageViewCallback) => {
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
}

export const deleteCards = (cardItems) => {
  cardItems.remove();
}

// Функция обработки лайка
export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
}
