const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: 'b72a4d40-213b-4ede-884c-e69303693f3a',
    'Content-Type': 'application/json'
  }
}
// Функция обработки ответов от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получение информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

// Получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}
// Редактирование профиля
export const updateUserInfo = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
  .then(checkResponse);
};
// Добавление новой карточки
export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(checkResponse);
};

// Удаление карточки
export const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
};

// Лайк поставлен
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
};

// Лайк снят
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
};

// Смена аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(checkResponse);
};