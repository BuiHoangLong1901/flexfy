import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getProductsByHome } from "../../server-side/api";
import { Carousel } from "../Carousel";
import { Image } from "../Image";
import { CardProduct } from "../card/Card";

const boxVariant: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } },
  hidden: { opacity: 0, y: 40 },
};

const images = [
  "https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw5WC1zSVFoMWVXNHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1674954273616-295ed56ff0e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
];

const ImageSlider = () => {
  return images.map((image, idx) => (
    <div className="banner-img" key={"slider_" + idx}>
      <Image src={image} alt="slider_01" ariaLabel="slider_01" />
    </div>
  ));
};

export const Wardrobe = () => {
  const control = useAnimation();
  const [products, setProducts] = useState<BaseProduct[] | null>();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getProductsByHome("/home/best-sellers");
    setProducts(data?.splice(0, 3));
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!products || products.length == 0) && fetchData();
    }
  }, [control, inView]);

  return (
    <div className="wardrobe">
      <h2 className="wardrobe-title">COMPLETE YOUR WARDROBE WITH THESE</h2>
      <motion.div
        className="product-list"
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}
      >
        {products?.map((product, index) => {
          return (
            <CardProduct
              product={product as Product}
              key={"best_sellers_" + product.name + `_${index}`}
              className="product-wardrobe"
              extraComponent={
                <button className="btn">
                  <span>choose your size</span>
                </button>
              }
            />
          );
        })}
      </motion.div>
      <div className="product-footer">
        <div className="title-box">
          <h2 className="title">HURRY! THESE DEALS WON'T LAST FOREVER!</h2>
        </div>
        <div className="carousel">
          <div className="banner">
            <div className="banner-information">
              <div className="banner-logo">
                <Image src="./logo.svg" alt="logo" ariaLabel="logo" />
              </div>
              <h2 className="banner-title">Summer Sale</h2>
              <div className="group">
                <span>Up to</span>
                <span className="group-sale-text">80%</span>
                <span>Off</span>
              </div>
              <button className="shop-now">
                <span>Shop Now</span>
              </button>
            </div>
            <div className="banner-wrapper">
              <Carousel items={ImageSlider()} pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
