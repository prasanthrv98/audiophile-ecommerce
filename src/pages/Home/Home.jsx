import React from "react";
import About from "../../components/About/About";
import Category from "../../components/Category/Category";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="main-container">
        <Category />
        <Products />
        <About />
      </div>
    </>
  );
};

export default Home;
