import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getMenu } from "../../server-side/api";
import { CollapseAni } from "../Collapse";
import { useProductOptionStore } from "../../store/product-option-store";

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
  hidden: { opacity: 0, x: -20 },
};
export const Menu = () => {
  const control = useAnimation();
  const { addOption: setMenu, menu } = useProductOptionStore();
  const [selected, setSelected] = useState<Menu>();

  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getMenu();
    console.log("%cMenu.tsx line:20 data", "color: #007acc;", data);
    setMenu("menu", data);
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!menu || menu.length == 0) && fetchData();
    }
  }, [control, inView]);
  if (!menu) return <></>;
  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className="menu-container"
    >
      <CollapseAni
        collapseKey="category"
        className={{ header: "header" }}
        btnText="Category"
        headerIcon={Number(menu?.length) > 0}
        defaultOpen={true}
      >
        <>
          {menu?.map((item, idx) => (
            <div
              onClick={() => {
                setSelected(item);
              }}
              className="item"
              key={"category_" + item.name + "_" + idx}
            >
              <span
                style={{
                  color: selected?.slug == item?.slug ? "black" : "",
                  fontWeight: selected?.slug == item.slug ? "bold" : "",
                }}
                className="item-text"
              >
                {item.name}
              </span>
            </div>
          ))}
        </>
      </CollapseAni>
    </motion.div>
  );
};
