//открытие модального окна по кнопке «Редактировать»
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}
//закрытие модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

//закрытие по клавиже esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened'); // Находим открытый попап
    closeModal(popup);
  }
}
