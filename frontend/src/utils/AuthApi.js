class AuthApi {
  constructor({ baseUrl, headers, credentials }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._credentials = credentials;
  }

  signUpUser(userData) {
    return this._sendRequest('/signup', 'POST', userData);
  }

  signInUser(userData) {
    return this._sendRequest('/signin', 'POST', userData);
  }

  signOutUser() {
    return this._sendRequest('/signout', 'GET', null);
  }

  _sendRequest(
    path,
    method,
    body,
    headers = this._headers,
    credentials = this._credentials
  ) {
    const options = {
      method,
      headers,
      credentials,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    });
  }
}

const authApi = new AuthApi({
  baseUrl: "https://api.mestoproject.sudents.nomoredomains.work",
  credentials: 'include',
  headers: {
      authorization: "837c0be1-5609-4c04-b384-491cd26df7eb",
      "Content-Type": "application/json",
  },
});

export default authApi;
