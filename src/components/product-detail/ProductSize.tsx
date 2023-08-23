import { Fragment, useState } from "react";
import { useCartStore } from "../../store/cart-store";
import { FindSizeModal } from "./FindSizeModal";

export const ProductSize = ({ product }: { product: ProductDetail }) => {
  const { band, cup, colors } = product;
  const [selected, setSelected] = useState<
    Record<string, string | number | undefined>
  >({ quantity: 1, color: colors[0].code });
  const showModal = useCartStore((s) => s.showModal);
  const onAddToCart = useCartStore((s) => s.onAddToCart);

  const isValid =
    selected.band &&
    selected.color &&
    selected.cup &&
    Number(selected.quantity) > 0;

  const handleAddToCart = () => {
    if (isValid) {
      const { quantity, color, ...options } = selected;
      const optionsString = Object.entries({ ...options })
        .map(([_, value]) => `${value}`)
        .join("");

      showModal(true);
      onAddToCart(product, Number(quantity), {
        size: optionsString,
        color: color,
      } as { size: string; color: string });
    }
  };

  if (!product) return <></>;
  return (
    <div className="product-detail-info-options">
      <div className="product-detail-swatches">
        <label htmlFor="" className="product-detail-label-swatch">
          <strong>color: </strong>
          {selected.color}
        </label>
      </div>
      <ul className="product-detail-swatchesLink">
        {colors.map((c, idx) => (
          <div
            style={{
              border: selected.color === c.code ? "1.2px solid #A39594" : "",
            }}
            className="product-detail-swatch-container"
            key={"color_" + selected.color + idx}
          >
            <li
              onClick={() => {
                setSelected((state) => ({
                  ...state,
                  color: state.color != c.code ? c.code : undefined,
                }));
              }}
              className="product-detail-swatch"
              key={"option_color_" + c.code}
              style={{ backgroundColor: c.color }}
            />
          </div>
        ))}
      </ul>
      <div className="product-detail-sizing-options">
        {Object.keys({ band, cup }).map((key, idx) => {
          return (
            <Fragment key={key + `_${idx}`}>
              <div className="product-detail-brand-option">
                <span className="product-detail-band-text">
                  {key}: {selected[key]}
                </span>
                {idx == 0 && <FindSizeModal />}
              </div>
              <div className="product-detail-band-list">
                {{ band, cup }[key]?.map((b) => (
                  <div
                    onClick={() => {
                      setSelected((state) => ({
                        ...state,
                        [key]: state[key] != b.code ? b.code : undefined,
                      }));
                    }}
                    style={{
                      backgroundColor: selected[key] === b.code ? "grey" : "",
                    }}
                    className="product-detail-label-wrapper"
                    key={`option_${key}_` + b.name}
                  >
                    <label
                      style={{
                        color: selected[key] === b.name ? "white" : "",
                      }}
                    >
                      {b.name}
                    </label>
                  </div>
                ))}
              </div>
            </Fragment>
          );
        })}
        <div className="product-detail-quantity">
          <span className="product-detail-quantity-text">quantity:</span>
        </div>
        <div className="product-detail-quantity_box">
          <img
            className="product-detail-quantity-minus"
            alt="Button"
            src="/assets/icons/minus.svg"
            onClick={() => {
              if (Number(selected?.quantity) <= 0) return;
              setSelected((state) => ({
                ...state,
                quantity: Number(state.quantity) - 1,
              }));
            }}
          />
          <div className="product-detail-quantity-input-wrapper">
            <input
              className="product-detail-quantity-input"
              readOnly
              value={selected.quantity}
            />
          </div>
          <img
            onClick={() => {
              setSelected((state) => ({
                ...state,
                quantity: Number(state.quantity) + 1,
              }));
            }}
            className="product-detail-quantity-plus"
            alt="Button"
            src="/assets/icons/plus.svg"
          />
        </div>
        <button
          className="product-detail-select-size"
          onClick={handleAddToCart}
        >
          {isValid ? (
            <span className="product-detail-select-size-text">add to cart</span>
          ) : (
            <span className="product-detail-select-size-text">
              select your size + color
            </span>
          )}
        </button>
        <div className="product-detail-spi">
          <p className="product-detail-spi-text">
            Pay in 4 interest-free installments for orders over ₱50.00 with Shop
            Pay.
          </p>
          <div className="product-detail-spi-learn-more">
            <a aria-label="learn_more" href="#">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
