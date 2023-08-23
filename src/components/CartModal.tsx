import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProductOne } from "../server-side/api";
import { useCartStore } from "../store/cart-store";
import { currencyFormat, generateOptions } from "../utils";
import { Carousel } from "./Carousel";
import { Image } from "./Image";
import { SelectBox } from "./SelectBox";
import Modal from "./modal";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const CartModal = () => {
  const isShowModal = useCartStore((s) => s.isShowModal);
  const { items, totalPrice } = useCartStore((s) => s.cart);
  const showModal = useCartStore((s) => s.showModal);
  const onRemoveToCart = useCartStore((s) => s.onRemoveToCart);
  const [productsLookComplete, setProductsLookComplete] = useState<
    BaseProduct[] | null
  >(null);

  const cartToggle = document.querySelector(".cart-toggle") as HTMLDivElement;

  const fetchData = async (slug: string | number) => {
    const data = await getProductOne(slug);
    setProductsLookComplete(data?.completeLook as BaseProduct[]);
  };

  useEffect(() => {
    if (items.length && !productsLookComplete) {
      const slug = items[0].slug ?? "";
      slug && fetchData(slug);
    }
  }, [items.length]);

  useEffect(() => {
    if (cartToggle) {
      cartToggle.addEventListener("click", () => showModal(!isShowModal));
    }
  }, [cartToggle]);

  return (
    <Modal showModal={isShowModal} className="cart-modal-container">
      <div className="cart-modal">
        <header className="cart-header">
          <div className="header-text">
            <span>your cart</span>
          </div>
          <Image
            className="x-icon cart-toggle"
            alt="x-icon"
            src="/assets/icons/x.svg"
            ariaLabel="x_icon_menu"
            onClick={() => showModal(false)}
          />
        </header>
        {items.length ? (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((item, idx) => {
                return (
                  <motion.div
                    className="cart-item"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    key={"product_" + item.name + idx}
                  >
                    <div className="item-thumbnail">
                      <a href={item.slug}>
                        <Image
                          className="item-img"
                          alt="thumbnail"
                          src={item.thumbnail ?? ""}
                          ariaLabel={"thumbnail_" + item.name + idx}
                        />
                      </a>
                    </div>
                    <div className="information-container">
                      <div className="information-main">
                        <div className="item-name">{item.name}</div>
                        <div className="item-category">
                          {item.option?.size}/ {item.option?.color}
                        </div>
                      </div>
                      <div className="information-discounts">
                        <button className="discounts">
                          <span>Discounts</span>
                        </button>
                        <span
                          className="remove"
                          onClick={() =>
                            onRemoveToCart({ key: item.key, price: item.price })
                          }
                        >
                          remove
                        </span>
                      </div>
                    </div>
                    <div className="item-right">
                      <div className="item-price">
                        <div className="after-seller">
                          {currencyFormat(
                            (item.price ?? 0) * item.quantity,
                            "USD",
                            2
                          )}
                        </div>
                        {item.originalPrice && (
                          <div className="before-seller">
                            {currencyFormat(item.originalPrice, "USD", 2)}
                          </div>
                        )}
                      </div>
                      <Quantity
                        productKey={item.key}
                        quantity={item.quantity ?? 0}
                        price={item.price}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="product-slider" id="product-list">
              {productsLookComplete && (
                <ProductList products={productsLookComplete} />
              )}
            </div>
            <div className="estimated">
              <div className="estimated-total">
                <h3 className="estimated-total-text">
                  Estimated Total: {currencyFormat(totalPrice || 0, "USD", 2)}
                </h3>
                <h3 className="estimated-total-description">
                  score! you earned free shipping
                </h3>
                <div className="line"></div>
              </div>
              <div className="cart-checkout">
                <a className="checkout-link" href="/payment">
                  checkout
                </a>
                <h3>
                  or pay in 4 interest-free installments of ₱12 with Shopay lear
                  more
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <CartEmpty />
        )}
      </div>
    </Modal>
  );
};

const RenderList = (
  items: BaseProduct[],
  handleAddToCart: (
    selected: {
      label: string;
      value: string;
    },
    item: BaseProduct
  ) => void
) => {
  if (!items) [<></>];
  return items.map((item, idx) => {
    const { band, cup, sizes } = item;
    const items = [
      { label: "choose size", value: "choose_size" },
      ...generateOptions({ band, cup, sizes }),
    ];
    return (
      <div
        className="product-detail-match-back-card"
        key={"cart-item_" + item.name + idx}
      >
        <a href={item.slug} className="product-detail-thumbnail">
          <Image
            src={item.thumbnail}
            className="product-detail-card-img"
            ariaLabel="thumbnail_product_1"
            alt={"thumbnail_" + item.name}
          />
        </a>
        <span className="product-detail-card-title">
          {item.name + item.name}
        </span>
        <span className="product-detail-card-price">
          {currencyFormat(item.price ?? 0, "PHP")}
        </span>
        <SelectBox
          className="product-detail-add-now"
          items={items}
          defaultValue={items[0].value}
          onChange={(selected) => handleAddToCart(selected, item)}
        />
      </div>
    );
  });
};

const ProductList = ({ products }: { products: BaseProduct[] }) => {
  const onAddToCart = useCartStore((s) => s.onAddToCart);
  const handleAddToCart = (
    selected: { label: string; value: string },
    product: BaseProduct
  ) => {
    if (selected.value !== "choose_size") {
      onAddToCart(product, 1, {
        size: selected.label,
        color: product.colors[0].code ?? "",
      });
    }
  };
  if (!products) return <></>;
  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="list-title">
          <h1 className="heading-best">complete picks for you</h1>
        </div>
      </div>
      <div style={{ zIndex: 2 }} className={"home-product"}>
        <Carousel
          items={RenderList(products, handleAddToCart)}
          className="cart-complete-slider"
          smooth={2}
        />
      </div>
    </div>
  );
};

const Quantity = ({
  quantity,
  productKey,
  price,
}: {
  quantity: number;
  productKey: string;
  price: number;
}) => {
  const onUpdateQuantity = useCartStore((s) => s.onUpdateQuantity);
  const updateQuantity = (qtn: number) =>
    onUpdateQuantity({ key: productKey, price, quantity: qtn });

  return (
    <div className="quantity">
      <div
        className="minus"
        onClick={() => updateQuantity(quantity > 0 ? quantity - 1 : quantity)}
      >
        –
      </div>
      <span className="value">{quantity}</span>
      <div className="icon-plus" onClick={() => updateQuantity(quantity + 1)}>
        +
      </div>
    </div>
  );
};

const CartEmpty = () => {
  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="cart-empty"
    >
      <Image
        className="cart-image"
        src="/assets/icons/cart-1.svg"
        alt="cart-empty"
        ariaLabel="cart-empty"
      />
      <h3 className="title-empty">Your cart is EMPTY</h3>
      <h3 className="title-error">That isn't right.</h3>
      <a
        href="/collections/sales"
        aria-label="shop-now-link"
        className="btn-link"
      >
        SHOP NOW
      </a>
    </motion.div>
  );
};
