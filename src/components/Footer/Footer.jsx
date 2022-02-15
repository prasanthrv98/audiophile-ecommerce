import "./footer.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/shared/desktop/logo.svg";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="main-container footer__container">
        <div className="footer__nav ">
          <img src={logo} alt="" className="logo" />
          <ul className="footer__nav-menu text-subtitle">
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
        </div>
        <p className="footer__text text-primary">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="footer__bottom">
          <p className="footer__copyrights text-primary">
            Copyright 2021. All Rights Reserved
          </p>
          <div className="footer__socials">
            <a href="http://www.facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="icon" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="icon" />
            </a>

            <a href="https:www.twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
