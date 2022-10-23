import { useNavigate } from "react-router-dom";
import { ProductType } from "../../types/products";
import { baseImageUrl } from "../../api/ShopService";
import "./CatalogItem.scss";

const CatalogItem = ({ ...product }: ProductType) => {
  const navigate = useNavigate();
  return (
    <div
      data-testid="catalog-item-elem"
      className="catalog-item"
      onClick={() => navigate(`/catalog/${product.id}`, { state: { product } })}
    >
      <div className="image-wrapper">
        <img
          width="300"
          height="450"
          src={`${baseImageUrl}${product.image}`}
          alt="catalog item"
        />
      </div>
      <div className="item-text">
        <span className="item-title">{product.title}</span>
        <span className="item-price">{product.price}£</span>
      </div>
    </div>
  );
};

export default CatalogItem;
