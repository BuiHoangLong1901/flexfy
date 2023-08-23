import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CollapseAni } from "../Collapse";

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, x: -10 },
};

export const Category = ({ data, slug }: { slug: string; data?: Menu }) => {
  if (!data) <></>;
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState<{ name: string; slug: string }>();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  if (!data || !data?.name) return <></>;
  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className="category-container"
    >
      <CollapseAni
        collapseKey="menu_collapse"
        btnText={data.name}
        className={{ header: "header" }}
        headerIcon={Number(data.subMenu.length) > 0}
        defaultOpen={true}
      >
        <>
          {data?.subMenu?.map((item, idx) => (
            <div
              onClick={() => setSelected(item)}
              className="item"
              key={"menu_" + idx}
            >
              <span
                style={{
                  color: selected?.slug == item?.slug ? "black" : "",
                  fontWeight: selected?.slug == item?.slug ? "bold" : "",
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
