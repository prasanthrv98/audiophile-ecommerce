import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ScrollToTop from "./helper/ScrollToTop";
import { CircularProgress } from "@material-ui/core";
// import CategoryPage from "./pages/Category/CategoryPage";
// import ProductPage from "./pages/Product/ProductPage";
// import Checkout from "./pages/Checkout/Checkout";

const CategoryPage = lazy(() => import("./pages/Category/CategoryPage"));
const ProductPage = lazy(() => import("./pages/Product/ProductPage"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts(response.data);
  };

  const fetchCart = async () => {
    const cartData = await commerce.cart.retrieve();
    setCart(cartData);
  };

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const updateCartQtyHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const clearCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCartHandler = async () => {
    const { cart } = await commerce.cart.refresh();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Navbar
        cart={cart}
        onClearCart={clearCartHandler}
        onUpdateCartQty={updateCartQtyHandler}
      />
      <Suspense
        fallback={
          <div className="loading-spinner">
            <CircularProgress />
          </div>
        }
      >
        <ScrollToTop>
          <Switch>
            <Route path="/checkout" exact>
              <Checkout cart={cart} onRefresh={refreshCartHandler} />
            </Route>

            <Route path="/" exact>
              <Home products={products} />
            </Route>
            <Route path="/:categoryName" exact>
              <CategoryPage products={products} />
            </Route>
            <Route path="/:categoryName/:productId" exact>
              <ProductPage products={products} onAddToCart={addToCartHandler} />
            </Route>
          </Switch>
        </ScrollToTop>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
