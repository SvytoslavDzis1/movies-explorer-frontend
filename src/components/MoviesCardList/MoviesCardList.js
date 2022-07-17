import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const location = useLocation();

  return (
    <section className="main-width movies">
      <div className="movies__grid">
        {props.movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie.movieId}
            onMovieButtonClick={props.onMovieButtonClick}
            isStagedSavedMovies={props.isStagedSavedMovies}
            movieButton={props.movieButton}
          />
        ))}
      </div>
      <div className="movies__block-button">
        {location.pathname === "/movies" && (
          <button
            className={`movies__button ${props.addMovies}`}
            type="button"
            onClick={props.onButtonClick}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
