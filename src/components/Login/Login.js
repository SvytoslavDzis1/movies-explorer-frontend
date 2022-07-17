import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { Validation } from "../../validation/validation";

function Login(props) {
  const { values, handleChange, errors, isValid } = Validation({
    email: "",
    password: "",
  });

  const valid = isValid && errors.email === "";

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(values);
  }

  return (
    <AuthForm
      title="Рады видеть!"
      text="Войти"
      formMessage={props.formMessage}
      authText="Ещё не зарегистрированы?"
      authLink="Регистрация"
      link="/signup"
      onSubmitForm={handleSubmit}
      valid={valid}
    >
      <span className="form__input-name">E-mail</span>
      <input
        className="form__input"
        type="email"
        autoComplete="off"
        required
        name="email"
        value={values.email || ''}
        onChange={handleChange}
      />
      <span className="form__input-error-span">{errors.email}</span>
      <span className="form__input-name">Пароль</span>
      <input
        className="form__input"
        type="password"
        autoComplete="off"
        required
        minLength="8"
        name="password"
        value={values.password || ''}
        onChange={handleChange}
      />
      <span className="form__input-error-span">{errors.password}</span>
    </AuthForm>
  );
}

export default Login;
