import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getProducts } from "../services/getProducts";
import "../firebase/config";
import fire from "../firebase/config";

function FProducts() {
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

  return (
    <div className="featured">
      <div class="text-center">
        <h2 className="title">Productos populares</h2>
        <div className="line"></div>
      </div>

      <div className="container">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 400}px)` }}>

          {
            products.map((product, index) => (

              <div className="card" key={index}>
                <img src={product.imageURL} alt={product.Nombre} />

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