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
