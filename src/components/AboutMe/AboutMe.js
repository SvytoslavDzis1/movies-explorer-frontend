import photo from "../../images/1.jpg";

function AboutMe() {
  return (
    <section id="about_me" className="main-width about-me">
      <h2 className="section-title about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__container-width">
          <p className="about-me__subtitle">Святослав</p>
          <p className="about-me__paragraph">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__text">
            Я родился в Саки, сейчас живу в городе Симферополь. Закончил
            факультет бизнес информатика КФУ. Однажды я понял, что не реализуюсь
            в профессии, и что работа не вызывает былого интереса и я услышал об
            обучении в Яндекс Практикуме "Веб-разработчик". Сейчас полностью
            посвящаю все время програмированию.
          </p>
          <ul className="about-me__items">
            <li className="about-me__item">
              <a
                className="about-me__link"
                href="https://www.facebook.com/"
                target="_blank"
              >
                Facebook
              </a>
            </li>
            <li className="about-me__item">
              <a
                className="about-me__link"
                href="https://github.com/SvytoslavDzis1"
                target="_blank"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={photo} alt="фото студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;
