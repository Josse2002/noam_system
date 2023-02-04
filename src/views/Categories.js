import React from "react";
import "../App.css"
import Header from "../components/Header";
import Categorie_banner from "../components/Categorie_banner";

function Categories({categoria}) {
    return (
        <div className="categorias">
            <Header />
            <Categorie_banner categoriaBanner={categoria}/>
        </div>
    );
}

export default Categories;