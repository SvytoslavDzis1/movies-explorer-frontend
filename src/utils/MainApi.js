class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((message) => Promise.reject(message))
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
      .then(this._checkResponse);
  }

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(this._checkResponse);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  patchUser(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then(this._checkResponse);
  }

  logout = () => {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  saveMovies(data) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: String(data.country),
        director: String(data.director),
        duration: data.duration,
        year: String(data.year),
        description: String(data.description),
        image: `https://api.nomoreparties.co` + data.image.url,
        trailerLink: data.trailerLink || `https://yandex.ru/search/?text=`,
        thumbnail: `https://api.nomoreparties.co/` + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: String(data.nameRU),
        nameEN: String(data.nameEN),
      })
    })
    .then(this._checkResponse);
  }

  deleteSavedMovie(_id) {
    return fetch(`${this._url}/movies/${_id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  url: "https://api.svatoslav.nomoredomains.work",
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json"
  }
});

export default mainApi;
