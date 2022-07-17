import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { Validation } from "../../validation/validation";

function Register(props) {
  const { values, handleChange, errors, isValid } = Validation({
    name: "",
    email: "",
    password: "",
  });

  const valid = isValid && errors.email === "";

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(values);
  }

  return (
    <AuthForm
      title="Добро пожаловать!"
      text="Регистрация"
      authText="Уже зарегистрированы?"
      authLink="Войти"
      link="/signin"
      onSubmitForm={handleSubmit}
      formMessage={props.formMessage}
      valid={valid}
    >
      <span className="form__input-name">Имя</span>
      <input
        className="form__input"
        type="text"
        autoComplete="off"
        required
        name="name"
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error-span">{errors.name}</span>
      <span className="form__input-name">E-mail</span>
      <input
        className="form__input"
        type="email"
        autoComplete="off"
        required
        name="email"
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="form__input-error-span">{errors.email}</span>
      <span className="form__input-name">Пароль</span>
      <input
        className="form__input"
        type="password"
        autoComplete="off"
        required
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        minLength="6"
      />
      <span className="form__input-error-span">{errors.password}</span>
    </AuthForm>
  );
}

export default Register;
