import logo_noam from '../images/logo_noam.png';

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import { getCategories } from "../services/getCategories";
import fire from "../firebase/config";
import { Link as Linked, animateScroll as scroll } from "react-scroll";

function Header() {

    const db = getFirestore(fire); // <-- Esta es la instancia de la base de datos
    const [categories, setCategories] = useState([]); // <-- Estado que almacene los productos

    useEffect(() => {

        getCategories(db, setCategories) // <-- Se manda el estado y la instancia de la base de datos

    }, []);


    return (

        <div>
            <div className="headerL">
                <div className="image">
                    <Link to="/">
                        <img src={logo_noam} alt="Noam Gemstone Logo" />
                    </Link>
                </div>
                <div className="options">
                    <Link to="/">Inicio</Link>
                    <Linked
                        to="Categorias"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={400}
                    >
                        Categorias
                    </Linked>
                    <Linked
                        to="services"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={400}
                    >
                        Servicios
                    </Linked>
                    <a href="#"><i class="fa-solid fa-bag-shopping"></i></a>
                </div>
            </div>
            <div className="categories">
                <div className='categories-options'>
                    {
                        categories.map((categorie, index) => (
                            <Link id={index} to={`/${categorie.nombre}`}>{categorie.nombre}</Link>

                        ))
                    }
                </div>
            </div>
        </div>

    )
}
export default Header;
