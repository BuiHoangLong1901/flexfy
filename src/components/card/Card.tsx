import type { Variants } from "framer-motion";
import { useState } from "react";
import { currencyFormat } from "../../utils";
import { Image, ImageAnimation } from "../Image";
import { Rating } from "../Rating";

const variants: Variants = {
  enter: { opacity: 0, translateX: "none" },
  center: { zIndex: 1, opacity: 1 },
  exit: { zIndex: 0, opacity: 0.5, translateX: "none" },
};

export const CardProduct = (props: {
  className?: string;
  product: Product;
  extraComponent?: JSX.Element;
}) => {
  const { className, product, extraComponent } = props;
  const [optionIndex, setOptionIndex] = useState(0);

  return (
    <div id="product" className={className}>
      <div className="product-thumbnail">
        <a href={"/products/" + product.slug}>
          {product?.options && (
            <div className="product-image">
              <ImageAnimation
                src={product?.options[optionIndex]?.thumbnail ?? ""}
                ariaLabel={"product-thumbnail"}
                alt={`thumbnail_${product.name}_${optionIndex}`}
                transition={{
                  opacity: { duration: 0.5, delay: 0.2 },
                }}
                initial="enter"
                animate="center"
                variants={variants}
                key={optionIndex}
              />
            </div>
          )}
          {product.isNew && (
            <div className="product-new-arrival">
              <span>NEW ARRIVAL</span>
            </div>
          )}
        </a>
      </div>
      <div className="product-content">
        {product.rating && (
          <div className="product-star">
            <Rating rating={product.rating} />
            <span className="product-review">
              {product.totalRating} Reviews
            </span>
          </div>
        )}
        <div className="product-title">
          <span>{product.name}</span>
        </div>
        <div className="product-price">
          {product.originalPrice && (
            <span className="original-price">
              {currencyFormat(product.originalPrice, "USD")}
            </span>
          )}
          <span>{currencyFormat(product.price, "USD")}</span>
        </div>
        <div className="product-options">
          <ul className="product-options-list">
            {product?.options?.map((option, idx) => (
              <li key={"product_options_" + option.code}>
                <div
                  className={`circle ${idx === optionIndex && "active"}`}
                  style={{ background: option.color }}
                  onClick={() => setOptionIndex(idx)}
                />
              </li>
            ))}
          </ul>
        </div>
        {extraComponent}
      </div>
    </div>
  );
};

export const CardCategory = (props: { category: Category }) => {
  const { category } = props;
  return (
    <div id="category" className={`card-category category-section`}>
      <div className="card-image">
        <Image
          src={category.url}
          ariaLabel={"card-thumbnail"}
          alt={category.name}
        />
      </div>
      <a className="card-button" href={"collections" + category.path}>
        <span>{category.name}</span>
      </a>
    </div>
  );
};

export const CardProductRaving = (props: { item: CrewRaving }) => {
  const { item } = props;
  return (
    <div className="product-raving">
      <div className="product-thumbnail">
        <a href={"/products/" + item.product.slug}>
          <div className="product-image">
            <Image
              src={item.product.thumbnail!}
              ariaLabel={"product-thumbnail"}
              alt={item.product.name}
            />
          </div>
        </a>
      </div>
      <div className="product-content">
        <div className="product-star">
          <Rating rating={item.rating} />
        </div>
        <div className="product-rate">
          <span>“{item.comment}”</span>
        </div>
        <div className="product-author">
          <span>{item.name}</span>
        </div>
        <a
          href={"/products/" + item.product.slug}
          className="product-shop-style"
        >
          SHOP STYLE
        </a>
      </div>
    </div>
  );
};
