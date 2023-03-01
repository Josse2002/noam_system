import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import fire from "../firebase/config";
import { getCategories} from '../services/getCategories';
import { getProducts } from '../services/getProducts';
import Home from '../views/Home';
import Categories from '../views/Categories';
import ProductDetails from '../views/product-details';
import CartView from '../views/CartView';
import InicioSesion from '../views/inicioSesion';
import ProfileView from '../views/profileView';
//importar un hola mundo


import {ProtectedRoute} from './ProtectedRoute';
import WayPay from '../views/WayPay';

const FIREBASE_CONFIG = getFirestore(fire);


function Router(){

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    getProducts(FIREBASE_CONFIG, setProducts);
    getCategories(FIREBASE_CONFIG, setCategories);
  }, [FIREBASE_CONFIG]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartView" element={<CartView />} />
          <Route path="/login" element={<InicioSesion />} />

          <Route element={<ProtectedRoute redirectTo={"/login"}/>}>
            <Route path="/my-profile" element={<ProfileView />} />
          </Route>


          <Route element={<ProtectedRoute redirectTo={"/login"}/>}>
            <Route path="/form-pay" element={<WayPay />} />
          </Route>
            
 
          
          {
            categories.map((category, index) => (
              <Route 
                key={index} 
                path={`/${category.nombre}`} 
                element={<Categories categoria={category.nombre} />} 
              />
            ))
          }
          {
            products.map((product, index) => (
              <Route 
                key={index} 
                path={`/producto/${product.Nombre}`} 
                element={<ProductDetails product={product} />} 
              />
            ))
          }
        </Routes>

      </BrowserRouter>

  );
};

export default Router;
