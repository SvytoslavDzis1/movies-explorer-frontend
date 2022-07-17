import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const [textInput, setTextInput] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onFindMovies(textInput.toLowerCase());
  }

  function changeSearch(text) {
    setTextInput(text);
  }

  function changeCheckbox(value) {
    setChecked(value);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        handleSubmit={handleSubmit}
        checked={checked}
        textInput={textInput}
        changeSearch={changeSearch}
        changeCheckbox={changeCheckbox}
      />
      <MoviesCardList
        movies={
          checked
            ? props.movies.filter((movie) => movie.duration <= 40)
            : props.movies
        }
        onMovieButtonClick={props.onMovieButtonClick}
        isStagedSavedMovies={props.isStagedSavedMovies}
        movieButton="movies-card__delete-button"
      />
      <Preloader
        isLoading={props.isLoading}
        isPreloader={props.isPreloader}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
