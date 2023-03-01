import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slice/cartSlice';

function ButtonsBuy({product}){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart && state.cart.items);
    const handleAddToCart = () => {
        dispatch(addToCart({...product, id: product.productId}));
      };

    return(
        <div className="buttons-buy">
            <button className="buy-now"> <i class="fa-solid fa-bag-shopping"></i> Comprar ahora</button>
            <button className="buy-later"  onClick={handleAddToCart} ><i class="fa-solid fa-cart-shopping"></i> Agregar al carrito</button>
        </div>
    )
}

export default ButtonsBuy;