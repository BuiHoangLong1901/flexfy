import { currencyFormat } from "../../utils";
import { Rating } from "../Rating";
import {
  FeaturesOption,
  ShippingOption,
  SizingMaterialOption,
  StyleNotesOption,
} from "./FeatureOptions";
import { ProductCompleteLook } from "./ProductCompleteLook";
import { ProductFeature } from "./ProductFeature";
import { ProductSize } from "./ProductSize";

export const ProductOptions = ({ product }: { product: ProductDetail }) => {
  return (
    <div className="product-detail-info">
      <div className="product-detail-info-header">
        <div className="product-detail-rate">
          <Rating rating={product.rating} />
          <span className="product-detail-stamped">
            {product.totalRating} reviews
          </span>
        </div>
        <div className="product-detail-title-price">
          <div className="product-detail-title">
            <span>{product.name}</span>
          </div>
          <div className="product-detail-price">
            {currencyFormat(product.price, "PHP")}
          </div>
        </div>
        {/* <span className="product-detail-PDPBanner">buy 2 save 10%</span> */}
      </div>
      <ProductSize product={product} />
      <ProductFeature data={product.keyFeatures} />
      <ProductCompleteLook products={product.completeLook} />
      {/* TODO */}
      <StyleNotesOption data={product.styleNotes} />
      <FeaturesOption data={product.features} />
      <SizingMaterialOption data={product.sizingMaterial} />
      <ShippingOption data={product.shipping} />
    </div>
  );
};
