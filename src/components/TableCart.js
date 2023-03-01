

import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, minQuantity, removeCart  } from '../slice/cartSlice';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import fire from "../firebase/config";
import { getFirestore} from 'firebase/firestore';
import CheckUser from '../services/checkUser';
import { doc, updateDoc } from "firebase/firestore";

function TableCart() {
    const items = useSelector((state) => state.cart.items) 
    const db = getFirestore(fire);
    const [usuario, getUsuariosDB] = useState([]);
    const dispatch = useDispatch();
    console.log(items);

    useEffect(() => {
        CheckUser(db, getUsuariosDB);
    }, [db]);

    const updateCartInDb = async (productId, quantity, position) => {
        const cartRef = doc(db, "usuarios", usuario.uid);
        if (quantity !== 0) {
            try {
                await updateDoc(cartRef, {
                    [`cartNumbers.${position}`]: quantity,
                });
                console.log("se actualizo la base de datos");
                console.log(items);
    
            } catch (error) {
                console.error("Error al actualizar carrito en la base de datos:", error);
            }
        }

        

    };
    
    const handleAddQuantity = (productId, quantity, position) => {
        dispatch(addQuantity(productId));
        updateCartInDb(productId, quantity + 1, position);
    };
    
   
    const priceShipping = 5;

   
    const handleMinQuantity = (productId, quantity, position) => {
        dispatch(minQuantity(productId));
        updateCartInDb(productId, quantity - 1, position);
    };
    const deleteItem = (productId) => {
        dispatch(removeCart(productId));
    };

    return (
        <div className='cart-info'>
            <table className='cart-table'>
                <thead>
                    <tr>
                        <th className='image'></th>
                        <th className='item'>Item</th>
                        <th className='precio'>Precio</th>
                        <th className='cantidad'>Cantidad</th>
                        <th className='total'>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
    
                            <tr className='product-cart-line' key={index}>
                                <td className='imageProductCell'><img src={item.productData.imageURL} alt=""/></td>
                                <td>
                                    <Link className='product-cart-name' to={`/producto/${item.productData.Nombre}`}>
                                        {item.productData.Nombre}
                                    </Link>
                                </td>
                                <td>${item.productData.Precio.toFixed(2)}</td>
                                <td>
                                    <div className='cantidad-counter'>
                                    <button onClick={() => handleMinQuantity(item.productId, item.quantity, item.cartNumber)}><i class="fa-solid fa-minus"></i></button>
                                        <span>{item.quantity}</span> 
                                    <button onClick={() => handleAddQuantity(item.productId, item.quantity, item.cartNumber)} ><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                   
                                    </td>
                                <td>${(item.productData.Precio * item.quantity).toFixed(2)}</td>
                                <td><button className='delete-button' onClick={() => deleteItem(item.id)}><i class="fa-sharp fa-solid fa-xmark"></i></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='cart-total'>
                <h2>Resumen</h2>
                <div className='infoSell'> 
                    <p> <span> Subtotal: </span></p>  
                    <p> ${items.reduce((a, c) => a + c.productData.Precio * c.quantity, 0).toFixed(2)}</p>
                </div>
                <div className='infoSell'> 
                    <p> <span> Estimado de envío: </span></p>  
                    <p> ${priceShipping.toFixed(2)}</p>
                </div>
                <div className='lineaSeparate'>
                    
                </div>
                <div className='infoSell'> 
                    <p> <span>Total:</span></p>  
                    <p> ${parseFloat(items.reduce((a, c) => a + c.productData.Precio * c.quantity, 0).toFixed(2)) + parseFloat(priceShipping.toFixed(2))}</p>
                </div>
                <div className='buttonSell'>
                    <Link to="/form-pay">Proceder a pago</Link>
                </div>
            </div>
        </div>
    );
}
export default TableCart;