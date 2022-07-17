import React from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Validation } from "../../validation/validation";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = Validation({
    name: "",
    email: "",
  });

  const valid =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email) &&
    (values.name !== "" || values.email !== "");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(values);
    values.name = "";
    values.email = "";
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile" onSubmit={handleSubmit}>
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile-form">
          <div className="profile-form__input-container">
            <input
              className="profile-form__input"
              type="text"
              autoComplete="off"
              name="name"
              required
              placeholder="Имя"
              value={values.name || ""}
              minLength="2"
              onChange={handleChange}
            />
            <span className="profile-form__input-text">{currentUser.name}</span>
          </div>
          <span className="profile-form__error">{errors.name}</span>
          <div className="profile-form__input-container">
            <input
              className="profile-form__input"
              type="email"
              autoComplete="off"
              name="email"
              required
              placeholder="E-mail"
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="profile-form__input-text">
              {currentUser.email}
            </span>
          </div>
          <span className="profile-form__error">{errors.email}</span>
          <p className="form__message">{props.profileMessage}</p>
          <button
            className={`profile-form__submit ${
              !valid && "profile-form__button_disabled"
            }`}
            disabled={!valid}
          >
            Редактировать
          </button>
        </form>
        <button className="profile__signout" type="button" onClick={props.onLogout}>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
