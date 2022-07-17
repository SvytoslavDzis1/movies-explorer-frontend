function Footer() {
  return (
    <section className="main-width footer">
      <p className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__items">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/SvytoslavDzis1"
              target="_blank"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://www.facebook.com/"
              target="_blank"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
