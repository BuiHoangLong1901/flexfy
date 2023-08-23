import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getColors } from "../../server-side/api";
import { useProductOptionStore } from "../../store/product-option-store";

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 } },
  hidden: { opacity: 0, x: -30 },
};
export const Color = ({ slug }: { slug: string }) => {
  const control = useAnimation();
  const { addOption: setColors, colors } = useProductOptionStore();

  const [selected, setSelected] = useState<Color>();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getColors();
    setColors("colors", data);
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!colors || colors.length == 0) && fetchData();
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className="color-container"
    >
      <div className="header">
        <span>FILTER BY COLOR</span>
      </div>
      <div className={"content"}>
        {colors?.map((item, idx) => (
          <div
            onClick={() => {
              setSelected(item);
            }}
            className="item"
            key={"color_" + idx}
          >
            <span
              className="item-color"
              style={{
                backgroundColor: item.color,
                borderColor: selected?.color == item.color ? "black" : "",
              }}
            />
            <span
              style={{
                fontWeight: selected?.color == item.color ? "bold" : "",
              }}
              className="item-text"
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
