function AboutProject() {
  return (
    <section id="about_project" className="main-width about-project">
      <h2 className="section-title about-project__title">О проекте</h2>
      <p className="about-project__subtitle">
        Дипломный проект включал 5 этапов
      </p>
      <p className="about-project__description">
        Составление плана, работу над бэкендом, вёрстку, добавление
        функциональности и финальные доработки.
      </p>

      <p className="about-project__subtitle">
        На выполнение диплома ушло 5 недель
      </p>
      <p className="about-project__description">
        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
        соблюдать, чтобы успешно защититься.
      </p>

      <div className="about-project__blocks">
        <div className="about-project__block about-project__block_type_back-end">
          1 неделя
        </div>
        <span className="about-project__block-text">Back-end</span>
        <div className="about-project__block about-project__block_type_front-end">
          4 недели
        </div>
        <span className="about-project__block-text">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;
