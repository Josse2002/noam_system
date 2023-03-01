import React, { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import { getProducts } from "../services/getProducts";
import "../firebase/config";
import fire from "../firebase/config";
import Router from "../routes/route";


import { useNavigate } from 'react-router-dom';

function FProducts({ tipo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const db = getFirestore(fire);
  const [products, setProducts] = useState([]); // <-- this is the state that will hold the products

  useEffect(() => {

    getProducts(db, setProducts) // <-- this is the function that will fetch the products

  }, []);

  //Functions to handle the slider
  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const navigate = useNavigate();
  function handleProductClick(product) {

      navigate(`/producto/${product.Nombre}`);
      <Router propiedades={product.Nombre} />
      
   
  }

  return (
    <div className="featured">
      <div class="text-center">
        <h2 className="title">{tipo}</h2>
        <div className="line"></div>
      </div>

      <div className="container">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 400}px)` }}>

          {
            products.map((product, index) => (

              <div className="card" key={index} onClick={() => handleProductClick(product)}>
                <div className="image-producto">
                   <img src={product.imageURL} alt={product.Nombre} />
                </div>
               

                <h2>{product.Nombre}</h2>
                <p className="description">{product.Descripcion}</p>
                <p className="price">${product.Precio}</p>
              </div>

            ))}
        </div>
        <button id="prevBtn" className="prevBtn" onClick={handlePrev} disabled={currentIndex === 0}>
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button id="nextBtn" className="nextBtn" onClick={handleNext} disabled={currentIndex === products.length - 1}>
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default FProducts;