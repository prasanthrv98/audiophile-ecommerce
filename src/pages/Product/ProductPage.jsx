import React from "react";
import { useParams } from "react-router-dom";
import About from "../../components/About/About";
import Category from "../../components/Category/Category";
import ProductDetail from "../../components/Products/ProductDetail/ProductDetail";

const ProductPage = ({ products, onAddToCart }) => {
  const params = useParams();

  const product = products.find((prod) => prod.id === params.productId);

  return (
    <>
      <div className="main-container">
        <ProductDetail product={product} onAddToCart={onAddToCart} />
        <Category />
        <About />
      </div>
    </>
  );
};

export default ProductPage;
