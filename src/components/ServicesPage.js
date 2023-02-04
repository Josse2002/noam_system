import React, { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import { getCategories } from "../services/getCategories";
import fire from "../firebase/config";
import "../firebase/config";


function ServicesPage() {

    const db = getFirestore(fire); // <-- Esta es la instancia de la base de datos
    const [categories, setCategories] = useState([]); // <-- Estado que almacene los productos
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {

        getCategories(db, setCategories) // <-- Se manda el estado y la instancia de la base de datos

    }, []);
    const handlePrev = () => {
        setCurrentIndex(currentIndex - 1);
      };
    
      const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
      };

    return (
        <div className="services">
            <div class="text-center">
                <h2 className="title">Nuestras categorías</h2>
                <div className="line"></div>
            </div>
           
                <section className="categories-card">
                    <div className="categorie slider" style={{ transform: `translateX(-${currentIndex * 400}px)` }}>
                        {
                            categories.map((categorie, index) => (
                                <div className="card card-category" key={index} style={{ backgroundImage: `url(${categorie.imageURL})` }}>
                                    <h2>{categorie.nombre}</h2>
                                </div>
                            ))
                        }

                    </div>
                    <button id="prevBtn" className="prevBtn" onClick={handlePrev} disabled={currentIndex === 0}>
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button id="nextBtn" className="nextBtn" onClick={handleNext} disabled={currentIndex === 2 - 1}>
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </section>
                
            
        </div>
    )
}

export default ServicesPage;