import { getFirestore } from 'firebase/firestore/lite';
import { getProducts } from "../services/getProducts";
import "../firebase/config";
import fire from "../firebase/config";
import React, { useState, useEffect } from "react";

function Productcategorie({ categoria }) {
    const db = getFirestore(fire);
    const [products, setProducts] = useState([]); // <-- this is the state that will hold the products

    useEffect(() => {

        getProducts(db, setProducts) // <-- this is the function that will fetch the products

    }, []);

    return (
        <div className='product-show'>
            {
                products.map((product, index) => (
                    

                    <div className="card card-product-categorie" key={index}>
                        <img src={product.imageURL} alt={product.Nombre} />

                        <h2>{product.Nombre}</h2>
                        <p className="description">{product.Descripcion}</p>
                        <p className="price">${product.Precio}</p>
                    </div>
                ))}
        </div>
    );
}

export default Productcategorie;