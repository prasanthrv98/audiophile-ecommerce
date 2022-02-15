import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./productPreview.scss";

const ProductPreview = ({ id, name, isOdd, description, previewImages }) => {
  const desktopImage = previewImages.filter((image) =>
    image.filename.includes("desktop")
  );

  const params = useParams();

  return (
    <>
      <div
        className="product-preview"
        style={{ flexDirection: `${isOdd ? "row-reverse" : "row"}` }}
      >
        <img
          src={desktopImage[0].url}
          alt=""
          className="product-preview__img"
        />
        <div className="product-preview__info">
          <h2 className="heading-secondary">{name}</h2>
          <p className="text-primary">{description}</p>
          <Link
            to={`/${params.categoryName}/${id}`}
            className="btn btn-primary text-subtitle"
          >
            see product
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductPreview;
