import "./categoryPage.scss";
import About from "../../components/About/About";
import Category from "../../components/Category/Category";
import ProductPreview from "../../components/Products/ProductPreview/ProductPreview";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const CategoryPage = ({ products }) => {
  const params = useParams();

  const filteredProducts = products.filter(
    (product) =>
      product.categories[0].slug === `${params.categoryName.toLowerCase()}`
  );

  const previewsData = filteredProducts.map((product) => {
    const previewAssets = product.assets.filter((asset) =>
      asset.filename.includes("product")
    );

    const description = product.description
      .replace("<p>", "")
      .replace("</p>", "");

    return {
      id: product.id,
      name: product.name,
      previewAssets,
      description,
    };
  });

  const isLoading = products.length === 0;

  return (
    <>
      <header className="category-header">
        <h2 className="heading-secondary">{params.categoryName}</h2>
      </header>
      <div className="main-container">
        {isLoading && (
          <div className="loading-spinner">
            <CircularProgress color="primary" />
          </div>
        )}
        <div className="product-previews">
          {previewsData.map((previewData, i) => (
            <ProductPreview
              key={previewData.id}
              id={previewData.id}
              isOdd={i % 2 !== 0}
              name={previewData.name}
              description={previewData.description}
              previewImages={previewData.previewAssets}
            />
          ))}
        </div>
        <Category />
        <About />
      </div>
    </>
  );
};

export default CategoryPage;
