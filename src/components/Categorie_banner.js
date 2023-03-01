
import { getFirestore } from 'firebase/firestore/lite';
import { getCategories } from "../services/getCategories";
import fire from "../firebase/config";
import React, { useState, useEffect } from "react";


function Categorie_banner({ categoriaBanner }) {
    const db = getFirestore(fire); // <-- Esta es la instancia de la base de datos
    const [categories, setCategories] = useState([]); // <-- Estado que almacene los productos

    useEffect(() => {
        getCategories(db, setCategories) // <-- Se manda el estado y la instancia de la base de datos
    }, []);



    return (
        <div>
            {categories.map((categorie, index) => {
                if (categorie.nombre === categoriaBanner) {
                    console.log(categorie.nombre);

                    return (
                        <div
                            className='image-brand categorie-banner'
                            style={{
                                backgroundImage: `url(${categorie.imageURL})`,
                            }}
                        >
                            <h2 key={index}>{categorie.nombre}</h2>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Categorie_banner;