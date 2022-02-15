import "./products.scss";
import { Link } from "react-router-dom";
import speaker1Img from "../../assets/home/desktop/image-speaker-zx9.png";

import speaker2ImgDesktop from "../../assets/home/desktop/image-speaker-zx7.jpg";

import earphoneImgDektop from "../../assets/home/desktop/image-earphones-yx1.jpg";
const Products = () => {
  return (
    <section className="products">
      {/* speaker zx9 */}
      <div className="products__speaker1">
        <div className="products__speaker1-img-box">
          <img src={speaker1Img} alt="" className="products__speaker1-img" />
        </div>
        <div className="products__speaker1-info">
          <h1 className="heading-primary">ZX9 SPEAKER</h1>
          <p className="text-primary">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Link
            to="/speakers/zx9-speaker"
            className="btn btn-tertiary text-subtitle"
          >
            see product
          </Link>
        </div>
      </div>

      {/* speaker zx7 */}
      <div
        style={{ backgroundImage: `url(${speaker2ImgDesktop})` }}
        className="products__speaker2"
      >
        <div className="products__speaker2-info container">
          <h4 className="heading-fourth">ZX7 SPEAKER</h4>
          <Link
            to="/speakers/zx9-speaker"
            className="btn btn-secondary text-subtitle"
          >
            see product
          </Link>
        </div>
      </div>

      {/* earphone yx1 */}

      <div className="products__earphone">
        <div className="products__earphone-img-box">
          <img src={earphoneImgDektop} alt="earphone-img" />
        </div>
        <div className="products__earphone-info">
          <div className="container">
            <h4 className="heading-fourth">YX1 EARPHONES</h4>
            <Link
              to="/earphones/yx1-earphone"
              className="btn btn-secondary text-subtitle"
            >
              see product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
