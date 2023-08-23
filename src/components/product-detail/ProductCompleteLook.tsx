import { useAnimation, type Variants, motion } from "framer-motion";
import { Image } from "../Image";
import { currencyFormat, generateOptions } from "../../utils";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useCartStore } from "../../store/cart-store";
import { SelectBox } from "../SelectBox";

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, x: -10 },
};

export const ProductCompleteLook = ({
  products,
}: {
  products: BaseProduct[];
}) => {
  const control = useAnimation();
  const showModal = useCartStore((s) => s.showModal);
  const onAddToCart = useCartStore((s) => s.onAddToCart);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  const handleAddToCart = (
    selected: { label: string; value: string },
    product: BaseProduct
  ) => {
    if (selected.value !== "add_now") {
      showModal(true);
      onAddToCart(product, 1, {
        size: selected.label,
        color: product.colors[0].code ?? "",
      });
    }
  };

  return (
    <div className="product-detail-match-back" ref={ref}>
      <h3 className="product-detail-match-back-title">complete the look</h3>
      <div className="product-detail-match-back-content">
        {products.map((product, idx) => {
          const { band, cup, sizes } = product;
          const items = [
            { label: "add now", value: "add_now" },
            ...generateOptions({ band, cup, sizes }),
          ];
          return (
            <motion.div
              className="product-detail-match-back-card"
              transition={{
                opacity: { duration: 0.5, delay: 0.2 },
              }}
              variants={boxVariant}
              initial="hidden"
              animate={control}
              key={product.name + idx}
            >
              <a
                href={product.slug}
                aria-label={product.name + "_link"}
                className="product-detail-thumbnail"
              >
                <Image
                  src={product.thumbnail}
                  className="product-detail-card-img"
                  ariaLabel="thumbnail_product_1"
                  alt={"thumbnail_" + product.name}
                />
              </a>
              <span className="product-detail-card-title">{product.name}</span>
              <span className="product-detail-card-price">
                {currencyFormat(product.price ?? 0, "PHP")}
              </span>
              <SelectBox
                className="product-detail-add-now"
                items={items}
                defaultValue={items[0].value}
                onChange={(selected) =>
                  handleAddToCart(selected, product as any)
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
