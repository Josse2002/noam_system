import '../App.css';
import Header from '../components/Header';
import ProductInfo from '../components/productInfo';
import React from 'react';
import FProducts from '../components/FProducts';
import Footer from '../components/footer';

function ProductDetails({product}) {
    return (
        <div className="categorias">
            <Header />
            <ProductInfo product={product}/>
            <FProducts tipo="Productos similares"/>
            <Footer/>
        </div>
    );
}

export default ProductDetails;