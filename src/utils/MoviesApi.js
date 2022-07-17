class MoviesApi {
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

  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-type": "application/json"
  }
});

export default moviesApi;
