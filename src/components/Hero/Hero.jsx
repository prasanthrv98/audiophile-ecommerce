import { Link } from "react-router-dom";
import "./hero.scss";

const Hero = ({ products }) => {
  const xx99Mark_2 = products?.filter((prod) =>
    prod.name.includes("XX99 Mark II")
  )[0];

  return (
    <header className="hero">
      <div className="hero__info">
        <h1 className="heading-primary">XX99 Mark II Headphones</h1>
        <p className="text-primary">
          Experience natural, life like audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Link
          to={`headphones/${xx99Mark_2?.id}`}
          className="btn btn-primary text-subtitle"
        >
          see product
        </Link>
      </div>
    </header>
  );
};

export default Hero;
