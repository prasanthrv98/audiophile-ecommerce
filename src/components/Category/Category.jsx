import "./category.scss";
import { Link } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import speakersImg from "../../assets/shared/desktop/image-category-thumbnail-speakers.png";
import headphonesImg from "../../assets/shared/desktop/image-category-thumbnail-headphones.png";
import earphonesImg from "../../assets/shared/desktop/image-category-thumbnail-earphones.png";

const categories = [
  { img: headphonesImg, title: "headphones" },
  { img: speakersImg, title: "speakers" },
  { img: earphonesImg, title: "earphones" },
];

const Category = () => {
  return (
    <section className="category">
      {categories.map((category, i) => (
        <div key={i} className="category__card">
          <div className="category__image-box">
            <img src={category.img} alt="headphone" />
          </div>
          <div className="category__title heading-category">
            {category.title}
          </div>
          <Link
            to={`/${category.title}`}
            className="category__btn text-subtitle"
          >
            shop
            <ArrowForwardIosOutlinedIcon className="btn-icon" />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default Category;
