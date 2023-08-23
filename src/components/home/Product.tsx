import { Variants, motion, useAnimation } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getProductsByHome } from "../../server-side/api";
import { Carousel } from "../Carousel";
import { CardCategory, CardProduct, CardProductRaving } from "../card/Card";

interface ProductProps {
  title: string;
  url: string;
  link?: string;
  className?: string;
  childComponent: (
    product: Product | Category | CrewRaving,
    index: number
  ) => ReactElement;
}

const boxVariant: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, y: 10 },
};

const RenderProducts = (
  items: Product[] | null,
  childComponent: (
    product: Product | Category | CrewRaving,
    index: number
  ) => JSX.Element
) => {
  if (!items) return [<></>];
  return items?.map((product, index) => childComponent(product, index));
};

export const Product = (props: ProductProps) => {
  const { title, url, link, className, childComponent } = props;
  const control = useAnimation();
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getProductsByHome(url);
    setProducts(data);
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!products || products.length == 0) && fetchData();
    }
  }, [control, inView]);

  return (
    <motion.div
      initial="hidden"
      animate={control}
      ref={ref}
      variants={boxVariant}
      transition={{
        duration: 0.5,
      }}
      id="product-list"
      className={className}
    >
      <div className="product-list-container">
        <div className="product-list-header">
          <div className="list-title">
            <h1 className="heading-best">{title}</h1>
            {link && (
              <a className="link-button" href={link}>
                <span>shop now</span>
              </a>
            )}
          </div>
        </div>
        <Carousel
          items={RenderProducts(products, childComponent) as JSX.Element[]}
          className="product-list"
          smooth={2}
          navigation
        />
      </div>
    </motion.div>
  );
};

export const BestSellerSection = () => (
  <div id="best-seller">
    <Product
      title="Best Seller"
      url="/home/best-sellers"
      link={`/collections/sales`}
      childComponent={(product, index) => (
        <CardProduct
          product={product as Product}
          key={"best_sellers_" + product.name + `_${index}`}
        />
      )}
    />
  </div>
);

export const SaleOffProductsSection = () => (
  <div id="sale-off-product">
    <Product
      title="Up to 30% Off"
      url="/home/sale-off-products"
      link="/collections/sale-off-products"
      childComponent={(product, index) => (
        <CardProduct
          product={product as Product}
          key={"sal_off_products_" + product.name + `_${index}`}
        />
      )}
    />
  </div>
);

export const SaleOffCategoriesSection = () => (
  <div id="sale-off-category">
    <Product
      title="15% Off Top Categories"
      url="/home/sale-off-categories"
      link="/collections/sale-off-categories"
      childComponent={(category, index) => (
        <CardCategory
          category={category as Category}
          key={"sale_off_categories_" + category.name + `_${index}`}
        />
      )}
    />
  </div>
);

export const ProductRavingSection = () => (
  <div id="product-raving-section">
    <Product
      title="Our Crew is Raving"
      url="/home/crew-raving"
      childComponent={(item, index) => (
        <CardProductRaving
          item={item as CrewRaving}
          key={"raving_product_" + item.name + `_${index}`}
        />
      )}
    />
  </div>
);
