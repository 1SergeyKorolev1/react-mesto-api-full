class Api {
  // constructor(baseUrl, headers) {
  //   this._baseUrl = baseUrl;
  //   this._headers = headers;
  // }
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  initialDataProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  initialCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(idCard, isLiked) {
    //console.log(isLiked);
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  }

  deleteCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  nameAndJobValues(name, nameJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: nameJob,
      }),
    }).then(this._getResponseData);
  }

  sendAvatarData(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponseData);
  }

  sendCardData(name, link) {
    //console.log(name, link);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

// const api = new Api("https://mesto.nomoreparties.co/v1/cohort-49", {
//   authorization: "3975d1d0-6b22-448d-8c6c-c2e5e9259bc3",
// });

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    authorization: `Bearer ${localStorage.jwt}`,
    "Content-Type": "application/json",
  },
});

export { api };
