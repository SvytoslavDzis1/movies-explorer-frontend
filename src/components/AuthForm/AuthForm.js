import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function AuthForm(props) {
  return (
    <section className="page-form">
      <Link to="/" className="page-form__logo-link">
        <img
        className="header__logo"
        src={logo}
        alt="круг"
      />
      </Link>
      <h2 className="page-form__title">{props.title}</h2>
      <form className="form" onSubmit={props.onSubmitForm}>
        {props.children}
        <p className="form__message">{props.formMessage}</p>
        <button
          className={`form__submit ${!props.valid && "form__submit_disabled"}`}
          type="submit"
          disabled={!props.valid}
        >
          {props.text}
        </button>
        <div className="form__container">
          <p className="form__auth-text">{props.authText}</p>
          <Link to={props.link} className="form__link">
            {props.authLink}
          </Link>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
