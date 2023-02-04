import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Categories from '../views/Categories';
import React, { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import { getCategories } from "../services/getCategories";
import fire from "../firebase/config";



const Router = () => {

  const db = getFirestore(fire); // <-- Esta es la instancia de la base de datos
  const [categories, setCategories] = useState([]); // <-- Estado que almacene los productos

  useEffect(() => {

    getCategories(db, setCategories) // <-- Se manda el estado y la instancia de la base de datos
    
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          categories.map((categorie, index) => (
            <Route id={index} path={`/${categorie.nombre}`} element={<Categories categoria={`${categorie.nombre}`} />} />
          ))
        }
      </Routes>
    </BrowserRouter>
  )
}

export default Router;