import "./navbar.scss";
import logo from "../../assets/shared/desktop/logo.svg";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const Navbar = () => {
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
      <ShoppingCartOutlinedIcon className="navbar__cart-icon" />
      <hr className="navbar__rule" />
    </nav>
  );
};

export default Navbar;
