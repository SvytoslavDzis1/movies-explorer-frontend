/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isSortMovies, setIsSortMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [isAddMovie, setIsAddMovie] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [infoMessage, setInfoMessage] = React.useState("");
  const [isSavedMovies, setIsSavedMovies] = React.useState([]);
  const [isStagedSavedMovies, setIsStagedSavedMovies] = React.useState([]);
  const [searhErrorMessage, setSearhErrorMessage] = React.useState("");
  const localStorageMovies =
    localStorage.getItem("movies") !== null
      ? JSON.parse(localStorage.getItem("movies"))
      : [];
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    email: "",
  });

  // Регистрация
  const register = (user) => {
    mainApi
      .register(user)
      .then(() => {
        login(user);
      })
      .catch((err) => {
        setInfoMessage(err.message);
        setTimeout(() => setInfoMessage(""), 7000);
      });
  };

  // Авторизация
  const login = (user) => {
    mainApi
      .authorize(user)
      .then((res) => {
        if (res.message === "Успешный вход") {
          localStorage.setItem("jwt", res["movieToken"]);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setInfoMessage(err.message);
        setTimeout(() => setInfoMessage(""), 7000);
      });
  };

  // Проверки авторизации пользователя при входе на сайт
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUser(jwt)
        .then((res) => {
          setLoggedIn(true);
          //navigate('/movies')
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(`Ошибка: ${err.message}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Сохранение данных профиля
  React.useEffect(() => {
    if (loggedIn === true) {
      mainApi
        .getUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.message}`);
        });
    }
  }, [loggedIn]);

  //Изменение данных профиля
  const handleUpdateProfile = (user) => {
    mainApi
      .patchUser(user)
      .then((res) => {
        setCurrentUser(res);
        setInfoMessage("Данные успешно изменены");
        setTimeout(() => setInfoMessage(""), 5000);
      })
      .catch((err) => {
        setInfoMessage(err.message);
        setTimeout(() => setInfoMessage(""), 5000);
      });
  };

  //Выход из профиля
  const handleLogout = () => {
    mainApi.logout().then((res) => {
      console.log(res);
      setLoggedIn(false);
      setIsSortMovies([]);
      setMovies([]);
      localStorage.removeItem("jwt");
      localStorage.removeItem("sortedmovies");
      localStorage.removeItem("movies");
      localStorage.removeItem("checkbox");
      localStorage.removeItem("text");
      navigate("/");
    });
  };

  // Поиск фильмов на странцие "Фильмы"
  const findMovies = (textInput, checked) => {
    if (textInput.length === 0) {
      setSearhErrorMessage("Нужно ввести ключевое слово");
      return;
    } else {
      setSearhErrorMessage("");
    }
    localStorage.removeItem("sortedmovies");
    setIsSortMovies([]);
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((result) => {
        return result.filter((movie) => filterMovies(movie, textInput));
      })
      .then((result) => {
        if (checked) {
          return result.filter((movie) => movie.duration <= 40);
        } else {
          return result;
        }
      })
      .then((result) => {
        localStorage.setItem("movies", JSON.stringify(result));
        localStorage.setItem("checkbox", JSON.stringify(checked));
        localStorage.setItem("text", JSON.stringify(textInput));
        if (result.length === 0) {
          showPreloaderMessage();
        } else {
          setIsLoading(false);
        }
        return result;
      })
      .then((result) => {
        moviesCount(result);
      })

      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };

  // Фильтр по поиску
  function filterMovies(movie, textInput) {
    if (movie.nameRU.toLowerCase().includes(textInput)) {
      return true;
    }
    //if (movie.nameEN.toLowerCase().includes(textInput)) {
    //return true;
    //}
  }

  //Результат поиска по короткометражкам
  const sortMovies = (checked) => {
    if (!checked) {
      const sortedMovies = localStorageMovies.filter(
        (movie) => movie.duration <= 40
      );
      setIsSortMovies(sortedMovies);
      localStorage.setItem("sortedmovies", JSON.stringify(sortedMovies));
      moviesCount(sortedMovies);
      return;
    }
    if (checked) {
      localStorage.removeItem("sortedmovies");
      setIsSortMovies([]);
      moviesCount(localStorageMovies);
      return;
    }
  };

  // Отображение сообщения, если фильмы не найдены
  const showPreloaderMessage = () => {
    setIsPreloader(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPreloader(false);
    }, 1200);
  };

  // Проверка разрешения экрана для рендера списка фильмов
  const moviesCount = (result) => {
    if (window.innerWidth >= 1280) {
      setMovies(result.slice(0, 12));
    } else if (window.innerWidth <= 1279 && window.innerWidth > 480) {
      setMovies(result.slice(0, 8));
    } else if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      setMovies(result.slice(0, 5));
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("sortedmovies") !== null) {
      setIsSortMovies(JSON.parse(localStorage.getItem("sortedmovies")));
      moviesCount(isSortMovies);
      return;
    }
    if (localStorage.getItem("movies") !== null) {
      moviesCount(localStorageMovies);
    } else {
      moviesCount(movies);
    }
  }, []);

  // Слушатель изменения разрешения экрана с ограничением на вызов
  let resizeTimeout;
  window.onresize = function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeHandler, 600);
  };

  // Обработчик изменения разрешения в зависимости: короткометражка или нет
  const resizeHandler = () => {
    if (isSortMovies.length > 0) {
      moviesCount(isSortMovies);
    } else {
      moviesCount(localStorageMovies);
    }
  };

  // Добавление фильмов в список кнопкой "Ещё"
  const addMoviesToList = () => {
    let arr;
    if (isSortMovies.length > 0) {
      arr = isSortMovies;
    } else {
      arr = localStorageMovies;
    }
    let movie;
    if (window.innerWidth >= 881) {
      movie = 3;
    } else if (window.innerWidth < 881) {
      movie = 2;
    }
    for (let i = movies.length; i < movies.length + movie; i++) {
      if (arr[i] === undefined) {
        return;
      } else {
        setMovies((movies) => [...movies, arr[i]]);
      }
    }
  };

  // Функция назначения действия кнопки  в зависимости от состояния
  const handleMovieButtonClick = (movie, isLiked) => {
    isLiked ? removeFromFavorite(movie) : addToFavorite(movie);
  };

  // Функция кнопки, для сохранения фильма
  const addToFavorite = (movie) => {
    mainApi
      .saveMovies(movie)
      .then((res) => {
        setIsSavedMovies([...isSavedMovies, res]);
        setIsStagedSavedMovies([...isStagedSavedMovies, res]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`);
      });
  };

  // Запрос на уже сохранённые фильмы
  const getUserMovies = () => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          return res.filter((c) => c.owner === currentUser._id);
        })
        .then((res) => {
          setIsSavedMovies(res);
          setIsStagedSavedMovies(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  React.useEffect(() => {
    getUserMovies();
  }, [currentUser]);

  // Поиск фильмов на странцие "Сохраненные фильмы"
  const findSavedMovies = (textInput) => {
    textInput.length === 0 && getUserMovies();
    const foundMovies = isStagedSavedMovies.filter((movie) =>
      filterMovies(movie, textInput)
    );
    if (foundMovies.length !== 0) {
      setIsSavedMovies(foundMovies);
    } else {
      setIsSavedMovies([]);
      setIsLoading(true);
      showPreloaderMessage();
    }
  };

  // Функция кнопки, для удаления фильма на странице "Фильмы"
  const removeFromFavorite = (movie) => {
    const forDelete = isStagedSavedMovies.find((c) => c.movieId === movie.id);
    mainApi
      .deleteSavedMovie(forDelete._id)
      .then(() => {
        setIsSavedMovies((state) =>
          state.filter((c) => c.movieId !== movie.id)
        );
        setIsStagedSavedMovies((state) =>
          state.filter((c) => c.movieId !== movie.id)
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`);
      });
  };

  // Функция кнопки, для удаления фильма на странице "Сохраненные фильмы"
  const deleteMovie = (movie) => {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setIsSavedMovies((state) => state.filter((c) => c !== movie));
        setIsStagedSavedMovies((state) => state.filter((c) => c !== movie));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`);
      });
  };

  // Правила отображения кнопки Ещё
  const changeClassButton = () => {
    movies.length === localStorageMovies.length ||
    movies.length === isSortMovies.length
      ? setIsAddMovie(false)
      : setIsAddMovie(true);
  };

  React.useEffect(() => {
    changeClassButton();
  }, [movies]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Register onRegister={register} formMessage={infoMessage} />
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Login onLogin={login} formMessage={infoMessage} />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                onFindMovies={findMovies}
                movies={movies}
                onButtonClick={addMoviesToList}
                onMovieButtonClick={handleMovieButtonClick}
                isLoading={isLoading}
                isPreloader={isPreloader}
                onSort={sortMovies}
                isStagedSavedMovies={isStagedSavedMovies}
                searhErrorMessage={searhErrorMessage}
                addMovies={
                  isAddMovie === false ? "movies-list__button_disabled" : ""
                }
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                movies={isSavedMovies}
                isStagedSavedMovies={isStagedSavedMovies}
                isLoading={isLoading}
                isPreloader={isPreloader}
                onMovieButtonClick={deleteMovie}
                onFindMovies={findSavedMovies}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateProfile}
                onLogout={handleLogout}
                profileMessage={infoMessage}
              />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
