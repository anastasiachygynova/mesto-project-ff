//Открытие модального окна
export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
};
//Закрытие модального окна
export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
};
//Закрытие по клавиже esc
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};
