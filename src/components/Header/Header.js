import React from "react";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const location = useLocation();
  const [popupMenu, setPopupMenu] = React.useState("");

  return (
    /*Если строка пути текущий страницы, начинается с / то header иначе header_color_black*/
    <header
      className={`${
        location.pathname === "/" ? "header" : "header_color_black"
      }`}
    >
      <div className="main-width header__container">
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src={logo} alt="круг" />
        </Link>

        {!props.loggedIn ? (
          <div className="header__menu">
            <Link to="/signup" className="header__button-register">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button-login">
              Войти
            </Link>
          </div>
        ) : (
          <>
            <button
              className="header__menu-button"
              type="button"
              onClick={() => setPopupMenu("popup_opened")}
            ></button>
            <div className={`popup ${popupMenu}`}>
              <div className="header__menu-popup">
                <button
                  className="popup__close-button"
                  type="button"
                  onClick={() => setPopupMenu("")}
                ></button>
                <Navigation />
              </div>
            </div>
            <div className="header__menu header__menu_type_authorized">
              <Navigation />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
