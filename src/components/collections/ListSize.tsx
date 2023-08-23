import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getSizes } from "../../server-side/api";
import {
  ProductOptionStore,
  useProductOptionStore,
} from "../../store/product-option-store";

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 } },
  hidden: { opacity: 0, x: -40 },
};
export const Size = ({ slug }: { slug: string }) => {
  const { addOption: setSizes, sizes } = useProductOptionStore();
  const control = useAnimation();
  const [selected, setSelected] = useState<Size>();
  const [ref, inView] = useInView();

  const fetchData = async () => {
    const data = await getSizes();
    setSizes("sizes", data);
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!sizes || sizes.length == 0) && fetchData();
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className="size-container"
    >
      <div className="header">
        <span>FILTER BY SIZE</span>
      </div>
      <div className={"content"}>
        {sizes?.map((item, idx) => (
          <div
            onClick={() => {
              setSelected(item);
            }}
            style={{
              backgroundColor: selected?.code == item.code ? "#ffb4b4" : "",
            }}
            className="item item-size"
            key={"size_" + idx}
          >
            <span className="item-text">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
