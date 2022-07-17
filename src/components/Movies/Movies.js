import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies(props) {

  const [textInput, setTextInput] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onFindMovies(textInput.toLowerCase(), checked)
  }

  function changeSearch(text) {
    setTextInput(text)
  }

  function changeCheckbox(value) {
    setChecked(value)
    localStorage.setItem('checkbox', JSON.stringify(!checked))
    props.onSort(checked)
  }

  React.useEffect(() => {
    if (localStorage.text) {
      setTextInput(JSON.parse(localStorage.getItem('text')))
    }
    if (localStorage.checkbox){
      setChecked(JSON.parse(localStorage.getItem('checkbox')))
    }
  }, [])

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        handleSubmit={handleSubmit}
        checked={checked}
        textInput={textInput}
        changeSearch={changeSearch}
        changeCheckbox={changeCheckbox}
        onSort={props.onSort}
        searhErrorMessage={props.searhErrorMessage}
      />
      <MoviesCardList
        movies={props.movies}
        onButtonClick={props.onButtonClick}
        onMovieButtonClick={props.onMovieButtonClick}
        isStagedSavedMovies={props.isStagedSavedMovies}
        movieButton="movies-card__like-button"
        addMovies={props.addMovies}/>
        <Preloader isLoading={props.isLoading}
        isPreloader={props.isPreloader}/>
      <Footer />
    </>
  );
}

export default Movies;
