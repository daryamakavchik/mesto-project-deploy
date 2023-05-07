class Api {
  constructor({ baseUrl, credentials }) {
    this._baseUrl = baseUrl;
    this._credentials = credentials;
  }

  getCards() {
    return this._sendRequest('/cards', 'GET');
  }

  getUserData() {
    return this._sendRequest('/users/me', 'GET');
  }

  updateUserData(newUserData) {
    return this._sendRequest('/users/me', 'PATCH', newUserData);
  }

  toggleCardLike(cardId, isLiked) {
    if (isLiked) {
      return this._sendRequest(`/cards/${cardId}/likes`, 'PUT');
    } else {
      return this._sendRequest(`/cards/${cardId}/likes`, 'DELETE');
    }
  }

  addNewCard(userCardData) {
    return this._sendRequest('/cards', 'POST', userCardData);
  }

  deleteCard(cardId) {
    return this._sendRequest(`/cards/${cardId}`, 'DELETE');
  }

  updateUserAvatar(newUserAvatar) {
    return this._sendRequest('/users/me/avatar', 'PATCH', newUserAvatar);
  }

  _getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': "application/json",
      'Authorization': "Bearer " + localStorage.getItem('jwt'),
    };
  }

  _sendRequest(
    path,
    method,
    body,
    credentials = this._credentials
  ) {
    const options = {
      method,
      credentials,
      headers: this._getHeaders()
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://api.mestoproject.students.nomoredomains.work",
  credentials: 'include'
});

export default api;
