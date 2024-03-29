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
    return
    // this._sendRequest('/signout', 'GET', null);
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
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    });
  }
}

const authApi = new AuthApi({
  baseUrl: "https://apimestoproject.azurewebsites.net",
  // baseUrl: "http://localhost:4000",
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json"
  },
});

export default authApi;
