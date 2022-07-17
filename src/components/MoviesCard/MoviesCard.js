import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const duration = props.movie.duration;
  const durationMovie =
    duration < 60
      ? `${duration}м`
      : `${Math.trunc(duration / 60)}ч ${duration % 60}м`;

  const movieLink = props.movie.owner
    ? props.movie.image
    : `https://api.nomoreparties.co${props.movie.image.url}`;

  const isLiked =
    props.movie.owner !== currentUser._id &&
    props.isStagedSavedMovies.some((m) => m.movieId === props.movie.id);

  const handleButtonClick = () => {
    props.onMovieButtonClick(props.movie, isLiked);
  };

  return (
    <article className="movies-card">
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={movieLink}
          alt={props.movie.name}
        />
      </a>
      <div className="movies-card__container">
        <h3 className="movies-card__name">{props.movie.nameRU}</h3>
        <button
          className={`${props.movieButton} ${
            isLiked && "movies-card__like-button_active"
          }`}
          onClick={handleButtonClick}
          type="button"
        ></button>
      </div>
      <p className="movies-card__time-duration">{durationMovie}</p>
    </article>
  );
}

export default MoviesCard;
