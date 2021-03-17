export const BASE_URL = 'https://auth.nomoreparties.co';

// const checkResponse = (response) => (response.ok ? response.json() : Promise.reject('Ошибка на сервере'));

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
}).then((res) => res);
export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
}).then((res) => (res.ok ? res.json() : res));
export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
}).then((res) => res);
