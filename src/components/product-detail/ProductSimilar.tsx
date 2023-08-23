import { Variants, motion, useAnimation } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getProductsByHome } from "../../server-side/api";
import { useCartStore } from "../../store/cart-store";
import { generateOptions } from "../../utils";
import { Carousel } from "../Carousel";
import { SelectBox } from "../SelectBox";
import { CardProduct } from "../card/Card";

const boxVariant: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, y: 10 },
};

export const ProductSimilar = () => {
  const onAddToCart = useCartStore((s) => s.onAddToCart);
  const [ref, inView] = useInView();
  const control = useAnimation();
  const showModal = useCartStore((s) => s.showModal);
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const fetchData = async () => {
    const data = await getProductsByHome("/home/best-sellers");
    setProducts(data);
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!products || products.length == 0) && fetchData();
    }
  }, [control, inView]);

  const handleAddToCart = (
    selected: { label: string; value: string },
    product: Product
  ) => {
    if (selected.value !== "choose_size") {
      onAddToCart(product, 1, {
        size: selected.label,
        color: product.options?.[0].code ?? "",
      });
      showModal(true);
    }
  };

  const renderProduct = (products: Product[]) => {
    if (!products) return <Fragment />;
    return products?.map((product, index) => {
      const { band, cup, sizes } = product;
      const items = [
        { label: "choose size", value: "choose_size" },
        ...generateOptions({ band, cup, sizes }),
      ];
      return (
        <CardProduct
          product={product as Product}
          key={"product_similar_" + product.name + index}
          extraComponent={
            <SelectBox
              className="product-detail-add-now"
              items={items}
              defaultValue={items[0].value}
              IconEnd={<></>}
              onChange={(selected) => handleAddToCart(selected, product)}
            />
          }
        />
      );
    });
  };

  return (
    <motion.div
      className="product-detail-similar"
      animate={control}
      variants={boxVariant}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
    >
      <h3 className="product-detail-similar-title">Complete your wardrobe</h3>
      <div className="product-detail-similar-list">
        <Carousel
          className="product-detail-similar-carousel"
          items={renderProduct(products ?? []) as JSX.Element[]}
        />
      </div>
    </motion.div>
  );
};
