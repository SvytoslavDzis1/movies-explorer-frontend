import React from "react";
import "./Preloader.css";

const Preloader = (props) => {

  const isText = props.isPreloader

  return props.isLoading && (
    <div className="preloader">
      {isText ?
      <p className='preloader__text-preloader'>Ничего не найдено</p> :
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>}
    </div>
  );
};

export default Preloader;



