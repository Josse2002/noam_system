import React from "react";

const Categories = ({ category }) => {
  let content;
  switch (category) {
    case "collares":
      content = <div>Contenido de collares</div>;
      break;
    case "carteras":
      content = <div>Contenido de carteras</div>;
      break;
    case "relojes":
      content = <div>Contenido de relojes</div>;
      break;
    case "pulseras":
      content = <div>Contenido de pulseras</div>;
      break;
    case "aretes":
      content = <div>Contenido de aretes</div>;
      break;
    default:
      content = null;
  }
  return content;
};

export default Categories;