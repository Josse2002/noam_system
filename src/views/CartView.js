import Header from '../components/Header';
import TableCart from '../components/TableCart';
import "../App.css";
import FProducts from '../components/FProducts';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';
import GetCart from '../services/GetCart';


function CartView() {
  const items = useSelector((state) => state.cart.items);
  return (
    <div>
      <Header />
      {items.length === 0 ? <h2>No carrito wey</h2> : <TableCart />}
      <GetCart />
      <FProducts tipo="Productos similares" />
      <Footer />
    </div>
  );
}

export default CartView;
