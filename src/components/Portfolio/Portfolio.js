function Portfolio() {
  return (
    <section className="main-width portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/SvytoslavDzis1/how-to-learn" target="_blank">Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/SvytoslavDzis1/russian-travel" target="_blank">Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/SvytoslavDzis1/mesto-react-api-full" target="_blank">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
