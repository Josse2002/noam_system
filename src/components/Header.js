import logo_noam from '../images/logo_noam.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getCategories } from "../services/getCategories";
import fire from "../firebase/config";
import { Link as Linked, animateScroll as scroll } from "react-scroll";
import CheckUser from '../services/checkUser';
import { getFirestore as getFirestoreLite } from 'firebase/firestore/lite';
import { getFirestore as getFirestoreFull } from 'firebase/firestore';
import GetCart from '../services/GetCart';

function Header() {
    const items = useSelector((state) => state.cart.items) 
    const user = useSelector((state) => state.user.user);
    const db = getFirestoreFull(fire);
    const dbLite = getFirestoreLite(fire); // <-- Esta es la instancia de la base de datos
    const [categories, setCategories] = useState([]);
    const [usuarios, getUsuariosDB] = useState([]); // <-- Estado que almacene los usuarios
    // <-- Estado que almacene los productos

   
    useEffect(() => {
        getCategories(dbLite, setCategories);
    }, [dbLite]);

    useEffect(() => {
        CheckUser(db, getUsuariosDB);
    }, [db]);


    return (

        <div>
            <GetCart />
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
                    <Link to={'/cartView'}><i class="fa-solid fa-cart-shopping"></i>
                        <span className="badge" >{items.length}</span>
            
                    </Link>
                    {user != null ? <Link to={"/my-profile"}><img className='imageProfileUser' src={usuarios.photo} referrerpolicy="no-referrer" alt="" /></Link> : (
                        <Link to="/login">Iniciar sesión</Link>
                    )}

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
