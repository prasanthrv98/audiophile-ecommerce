import { Link } from "react-router-dom";
import "./hero.scss";
// import heroImage from "../../assets/home/desktop/image-hero.jpg";

const Hero = () => {
  return (
    <header className="hero">
      <div className="hero__info">
        <h1 className="heading-primary">XX99 Mark II Headphones</h1>
        <p className="text-primary">
          Experience natural, life like audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Link
          to="headphones/xx99-mark2"
          className="btn btn-primary text-subtitle"
        >
          see product
        </Link>
      </div>
    </header>
  );
};

export default Hero;
