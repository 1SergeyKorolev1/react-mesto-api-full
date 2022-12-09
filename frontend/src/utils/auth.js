class Auth {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }

  onRegister(name, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: name,
        email: email,
      }),
    }).then(this._getResponseData);
  }

  onAuthorize(name, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: name,
        email: email,
      }),
    }).then(this._getResponseData);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const auth = new Auth({
  baseUrl: "https://api.svitogor.nomoredomains.club",
});

export { auth };
