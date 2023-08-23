import { Variants, motion } from "framer-motion";
import { ProductOptions } from "./ProductOptions";
import { useEffect, useState } from "react";
import { getProductOne } from "../../server-side/api";
import { ProductSlider } from "./ProductSlider";
import { RatingOverview } from "../Rating";
import { NotFound } from "../NotFound";
import { ProductSimilar } from "./ProductSimilar";

const boxVariant: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, y: 10 },
};

export const ProductDetail = ({ slug }: { slug?: string }): JSX.Element => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const fetchData = async (slug: string | number) => {
    const data = await getProductOne(slug);
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    if (slug && !product) {
      fetchData(slug);
    }
  }, []);

  if (loading) return <>...loading</>;
  if (!product) return <NotFound />;
  return (
    <motion.div
      variants={boxVariant}
      animate={{ opacity: loading ? 0.2 : 1, y: 0 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: loading ? 0.2 : 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="product-detail-container"
    >
      <div className="product-detail">
        <ProductSlider product={product} />
        <ProductOptions product={product} />
      </div>
      <ProductSimilar />
      <RatingOverview slug={slug!} />
    </motion.div>
  );
};
