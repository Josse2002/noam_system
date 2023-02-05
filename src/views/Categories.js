import React from "react";
import "../App.css"
import Header from "../components/Header";
import Categorie_banner from "../components/Categorie_banner";
import Productcategorie from "../components/product-categorie";

function Categories({categoria}) {
    return (
        <div className="categorias">
            <Header />
            <Categorie_banner categoriaBanner={categoria}/>
            <Productcategorie categoria={categoria}/>
        </div>
    );
}

export default Categories;