import { useState, useEffect } from "react";
import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore as getFirestoreFull } from 'firebase/firestore';
import fire from "../firebase/config";
import { getProducts } from "./getProducts";
import CheckUser from "./checkUser";
import { useDispatch, useSelector } from 'react-redux';
import { setCartInitial } from '../slice/cartSlice';
function GetCart() {
  const db = getFirestore(fire);
  const dbFull = getFirestoreFull(fire);
  const [products, setProducts] = useState([]);
  const [usuarios, getUsuariosDB] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    getProducts(db, setProducts);
    CheckUser(dbFull, getUsuariosDB);
    setIsMounted(false);
  }, [dbFull]);
  
  
  useEffect(() => {
    
    if (isMounted === false) {
      
      if (usuarios !== undefined && products !== undefined) {
        products.map((product) => {
          if (Object.keys(usuarios.cart).length !== 0 || Object.keys(usuarios.cart).length !== undefined) {
            for (let i = 0; i < Object.keys(usuarios.cart).length + 1; i++) {
              if (product.productId === usuarios.cart[i]) {
                console.log(carrito.length);
                if(carrito.length === 0){
                  setCart((cart) => [...cart, {productId: product.productId, quantity: usuarios.cartNumbers[i], productData: product, cartNumber: i}]);
                }
              }
            }
    
            return null;
          }else{
            dispatch(setCartInitial([]));
          }
          
        });
      }

    }else{

    }
    setIsMounted(true);
  }, [usuarios, products, carrito, isMounted]);

  if(carrito.length === 0 && cart.length > 0){
    dispatch(setCartInitial(cart));
  }
  return null;
}

export default GetCart;