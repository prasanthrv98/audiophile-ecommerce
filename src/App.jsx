import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductPage from "./pages/Product/ProductPage";
import ScrollToTop from "./helper/ScrollToTop";
import Checkout from "./pages/Checkout/Checkout";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});

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

  // const removeCartQtyHandler = async (productId) => {
  //   const { cart } = await commerce.cart.remove(productId);
  //   setCart(cart);
  // };

  const clearCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCartHandler = async () => {
    const { cart } = await commerce.cart.refresh();
    setCart(cart);
  };

  // const checkoutHandler = async (checkoutTokenId, newOrder) => {
  //   // pi_3KaazuSGrTIIqPQr1Sq1aY92_secret_7pDjNz2IvMflTnstcEM4wZZuC
  //   try {
  //     const incomingOrder = await commerce.checkout.capture(
  //       checkoutTokenId,
  //       newOrder
  //     );

  //     setOrder(incomingOrder);
  //     refreshCart();
  //     console.log("order sucessfull!!!");
  //   } catch (error) {
  //     console.log(error.data.error.param);
  //     setPaymentErrorId(error.data.error.param);

  //     console.log("checkout errorrr");
  //     setErrorMessage(error.data.error.message);
  //   }
  // };

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
      <Footer />
    </>
  );
};

export default App;
