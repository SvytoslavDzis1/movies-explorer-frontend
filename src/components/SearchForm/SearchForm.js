import React from "react";
function SearchForm(props) {
  function handleChangeSearch(evt) {
    props.changeSearch(evt.target.value);
  }

  function handleChangeCheckbox() {
    props.changeCheckbox((checkBox) => !checkBox);
  }

  return (
    <section className="main-width section__search-form">
      <form className="search-form" onSubmit={props.handleSubmit}>
        <div className="search-form__container">
          <input
            type="text"
            autoComplete="off"
            name="movies"
            placeholder="Фильм"
            className="search-form__input"
            value={props.textInput}
            onChange={handleChangeSearch}
          />
          <button className="search-form__submit-button" type="submit"></button>
        </div>
        <span className="search-form__error-message">
          {props.searhErrorMessage}
        </span>
        <div className="checkbox">
          <label className="search-form__switch">
            <input
              type="checkbox"
              className="search-form__checkbox"
              checked={props.checked}
              onChange={handleChangeCheckbox}
            />
            <span className="search-form__slider"></span>
          </label>
          <p className="search-form__slider-name">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
