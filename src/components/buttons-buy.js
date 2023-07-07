import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import { useState, useEffect } from 'react';
import fire from "../firebase/config";
import { getFirestore} from 'firebase/firestore';
import CheckUser from '../services/checkUser';
import { doc, updateDoc} from "firebase/firestore";


// This function is called when the user clicks the "Buy" button to add a product to their cart.
// The product parameter is the product object that the user is trying to buy.

function ButtonsBuy({product}){
    const [usuario, getUsuariosDB] = useState([]);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items)

    const db = getFirestore(fire);

    useEffect(() => {
        CheckUser(db, getUsuariosDB);
    }, [db]);

    const handleAddToCartDatabase = async () => {
        const userRef = doc(db, "usuarios", usuario.uid);
        const existingProductIndex = items.findIndex(item => item.productId === product.productId);

        
        if (existingProductIndex === -1) {
            try {
                if(items.length === 0){
                    await updateDoc(userRef, {
                        [`cartNumbers.${items.length}`]: 1,
                        [`cart.${items.length}`]: product.productId,
                    });
                }else{
                    await updateDoc(userRef, {
                        [`cartNumbers.${items.length}`]: 1,
                        [`cart.${items.length}`]: product.productId,
                    });
                }
            } catch (error) {
                console.error("Error al actualizar carrito en la base de datos:", error);
            }
        }else{
            try {
                await updateDoc(userRef, {
                    [`cartNumbers.${existingProductIndex}`]: items[existingProductIndex].quantity + 1,
                });
            } catch (error) {
                console.error("Error al actualizar carrito en la base de datos:", error);
            }
        }
    };


    const handleAddToCart = () => {
        dispatch(addToCart({...product}));
        handleAddToCartDatabase();
      };

    return(
        <div className="buttons-buy">
            <button className="buy-now"> <i class="fa-solid fa-bag-shopping"></i> Comprar ahora</button>
            <button className="buy-later"  onClick={handleAddToCart} ><i class="fa-solid fa-cart-shopping"></i> Agregar al carrito</button>
        </div>
    )
}

export default ButtonsBuy;