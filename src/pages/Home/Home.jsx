import { CircularProgress } from "@material-ui/core";
import React from "react";
import About from "../../components/About/About";
import Category from "../../components/Category/Category";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";

const Home = ({ products }) => {
  return (
    <>
      {products.length > 1 ? (
        <Hero products={products} />
      ) : (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}

      <div className="main-container">
        <Category />
        {products.length > 1 ? (
          <Products products={products} />
        ) : (
          <div className="loading-spinner">
            <CircularProgress />
          </div>
        )}

        <About />
      </div>
    </>
  );
};

export default Home;
