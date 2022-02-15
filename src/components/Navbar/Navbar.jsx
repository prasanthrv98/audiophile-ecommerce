import "./navbar.scss";
import logo from "../../assets/shared/desktop/logo.svg";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import Cart from "../Cart/Cart";
import { useState } from "react";

const Navbar = ({ cart, onUpdateCartQty, onClearCart }) => {
  const [showCart, setShowCart] = useState(false);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  return (
    <nav className="navbar">
      <img src={logo} alt="" className="logo" />
      <ul className="navbar__menu text-subtitle">
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/headphones">headphones</Link>
        </li>
        <li>
          <Link to="/speakers">speakers</Link>
        </li>
        <li>
          <Link to="/earphones">earphones</Link>
        </li>
      </ul>
      <ShoppingCartOutlinedIcon
        className="navbar__cart-icon"
        onClick={openCart}
      />
      <hr className="navbar__rule" />

      {showCart && (
        <Modal onClose={closeCart}>
          <Cart
            cart={cart}
            onClearCart={onClearCart}
            onUpdateCartQty={onUpdateCartQty}
          />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
