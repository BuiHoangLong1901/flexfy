import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getBanners } from "../../server-side/api";
import { Carousel } from "../home/Carousel";

const boxVariant: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, y: 10 },
};

export const Banner = () => {
  const control = useAnimation();
  const [banners, setBanners] = useState<Banner[] | null>(null);
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getBanners();
    if (data) {
      setBanners(data);
      document.head.innerHTML += `<link rel="preload" as="image" href="${data[0].url}">`;
    }
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!banners || banners.length == 0) && fetchData();
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      {banners && (
        <div className={"home-banner"}>
          <Carousel images={banners.map((banner) => banner.url)} />

          <a aria-label="shop-sales" href="/collections/sales">
            <div className={"link-shop-sale"}>
              <div className="shop-sale">shop sale</div>
            </div>
          </a>
        </div>
      )}
    </motion.div>
  );
};
