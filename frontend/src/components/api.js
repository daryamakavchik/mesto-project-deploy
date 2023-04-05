const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-8",
    headers: {
        authorization: "837c0be1-5609-4c04-b384-491cd26df7eb",
        "Content-Type": "application/json",
    },
};

const checkResponse = function (res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    }).then(checkResponse);
};

export const setUserInfo = (userName, userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userInfo,
        }),
    }).then(checkResponse);
};

export const initialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers,
    }).then(checkResponse);
};

export const setAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        }),
    }).then(checkResponse);
};

export const addNewCard = (placename, imagelink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: placename,
            link: `${imagelink}`,
        }),
    }).then(checkResponse);
};

export const removeCardServer = (newCard) => {
    return fetch(`${config.baseUrl}/cards/${newCard._id}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(checkResponse);
};

export const handleLikesServer = (newCard, method) => {
    return fetch(`${config.baseUrl}/cards/likes/${newCard._id}`, {
        method: method,
        headers: config.headers,
    }).then(checkResponse);
};
