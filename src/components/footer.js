import logo_noam from '../images/logo_noam.png';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import { getCategories } from "../services/getCategories";
import fire from "../firebase/config";


function Footer() {

    const db = getFirestore(fire); // <-- Esta es la instancia de la base de datos
    const [categories, setCategories] = useState([]); // <-- Estado que almacene los productos

    useEffect(() => {

        getCategories(db, setCategories) // <-- Se manda el estado y la instancia de la base de datos

    }, []);


    return (
        <footer class="flex-wr">
            <div className="footerStyle generic-anchor">
                <ul class="footer-list-top">
                    <h4 class="footer-list-header">Categorias</h4>
                    {
                        categories.map((categorie, index) => (
                            <Link id={index} to={`/${categorie.nombre}`} className="footer-list-anchor">{categorie.nombre}</Link>

                        ))
                    }
                </ul>

                <ul class="footer-list-top horario">
                    <h4 class="footer-list-header">Horario</h4>
                    <h5 className=" footer-list-anchor">Lunes a Viernes</h5>
                    <p className=" footer-list-anchor">8:00 am - 10:00 pm</p>
                    <h5 className="footer-list-anchor">Sabado a domingo</h5>
                    <p className="footer-list-anchor">8:00 am - 11:00 pm</p>
                </ul>

                <ul class="footer-list-top">
                    <h4 class="footer-list-header">Contacto</h4>
                    <a href="https://api.whatsapp.com/send?phone=50377981569" className="generic-anchor footer-list-anchor" target="_blank"><i className="fa-brands fa-whatsapp"></i>7798 1569</a>
                    <a href='mailto:noamgemstone.jewerly@gmail.com' target="_blank" className="generic-anchor footer-list-anchor">noamgemstone.jewerly@gmail.com</a>
                </ul>

                <img src={logo_noam} alt="" />
            </div>
            <div className="socialNet">
                <a href="https://www.facebook.com/profile.php?id=100089339387749" class="generic-anchor" target="_blank" ><i class="fa fa-facebook"></i></a>

                <a href="https://www.instagram.com/noam_gemstone/" class="generic-anchor" target="_blank"  ><i class="fa fa-instagram"></i></a>

                <a href="https://api.whatsapp.com/send?phone=50377981569" class="generic-anchor" target="_blank"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
        </footer>


    );
}

export default Footer;