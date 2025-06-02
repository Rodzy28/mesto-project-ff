const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '2ab0595f-4e7d-4a53-8d21-f686bd0f7d4b',
    'Content-Type': 'application/json',
  },
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleServerResponse);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleServerResponse);
};

export const setUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleServerResponse);
};

export const setAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleServerResponse);
};

export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleServerResponse);
};

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleServerResponse);
};

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleServerResponse);
};

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleServerResponse);
};
