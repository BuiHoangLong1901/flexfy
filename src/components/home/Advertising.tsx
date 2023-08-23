import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getAdvertises } from "../../server-side/api";
import { Image } from "../Image";
import { motion } from "framer-motion";
export const Advertising = () => {
  const [ref, inView] = useInView();
  const [advertises, setAdvertises] = useState<Advertising[] | null>(null);
  const fetchData = async () => {
    const data = await getAdvertises();
    setAdvertises(data);
  };
  useEffect(() => {
    if (inView) {
      !advertises && fetchData();
    }
  }, [inView]);
  return (
    <div className="home-advertising" ref={ref}>
      {advertises &&
        advertises.length !== 0 &&
        advertises.map((item: Advertising, idx: number) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="home-advertising-image"
              key={"home_advertising_" + idx}
            >
              <Image src={item.url} alt="Advertising" ariaLabel="Advertising" />

              <p className="home-advertising-text">no slip, no sweat.</p>
              <button>
                <a href={"/collections" + item.path}>{item.name}</a>
              </button>
            </motion.div>
          );
        })}
    </div>
  );
};
