import { CircularProgress } from "@material-ui/core";
import "./productDetail.scss";

const ProductDetail = ({ product, onAddToCart }) => {
  // gaurd clause -> return load spinner if there is no product untill there is a product object (Object?.keys(product)?.length === 0)
  if (!product) {
    return (
      <div className="loading-spinner">
        <CircularProgress color="primary" />
      </div>
    );
  }

  const desktopImg = product.assets.find((imgs) =>
    imgs.filename.includes("desktop-product")
  ).url;

  const tabletImg = product.assets.find((imgs) =>
    imgs.filename.includes("tablet-product")
  ).url;

  const mobileImg = product.assets.find((imgs) =>
    imgs.filename.includes("mobile-product")
  ).url;

  const desktopGallerys = product.assets
    .filter((imgs) => imgs.filename.includes("desktop-gallery"))
    .sort((a, b) => {
      let fa = a.filename;
      let fb = b.filename;

      if (fa < fb) return -1;
      if (fa > fb) return 1;
      return 0;
    });

  const desktopGalleryImg1 = desktopGallerys[0].url;
  const desktopGalleryImg2 = desktopGallerys[1].url;
  const desktopGalleryImg3 = desktopGallerys[2].url;

  const description = product.description
    .replace("<p>", "")
    .replace("</p>", "");

  return (
    <div className="product-detail">
      <div className="product-detail__hero">
        <img src={desktopImg} alt="" className="product-preview__img" />
        <div className="product-preview__info">
          <h2 className="heading-secondary">{product.name}</h2>
          <p className="text-primary">{description}</p>
          <h6 className="heading-category">
            {product.price.formatted_with_symbol}
          </h6>
          <button
            className="btn btn-primary text-subtitle"
            onClick={() => onAddToCart(product.id, 1)}
          >
            add product
          </button>
        </div>
      </div>

      <div className="product-detail__gallery">
        <div className="col-1">
          <img src={desktopGalleryImg1} alt="" className="gallery-1" />
          <img src={desktopGalleryImg2} alt="" className="gallery-1" />
        </div>
        <div className="col-2">
          <img src={desktopGalleryImg3} alt="" className="gallery-1" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
