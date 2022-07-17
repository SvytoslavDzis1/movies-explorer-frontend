import logoP from "../../images/pic__COLOR_landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="promo__logoP" src={logoP} alt="буквы П"></img>
    </section>
  );
}

export default Promo;
