import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CollapseAni } from "../Collapse";

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, x: -10 },
};

const FeatureOptions = ({
  items,
  title,
  className,
}: {
  items: { name: string | JSX.Element; code: string }[];
  title: string;
  className?: string;
}) => {
  if (!items) <></>;
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  if (!items || !items?.length) return <></>;
  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className={`feature-collapse ${className}`}
    >
      <CollapseAni
        collapseKey="menu"
        btnText={title}
        className={{ header: "header" }}
        defaultOpen={false}
      >
        <>
          {items?.map((item, idx) => (
            <div
              dangerouslySetInnerHTML={{ __html: item.name }}
              key={"menu_" + idx}
            />
          ))}
        </>
      </CollapseAni>
    </motion.div>
  );
};

export const StyleNotesOption = ({ data }: { data: string }) => {
  return (
    <FeatureOptions
      items={[{ name: data, code: "style_notes" }]}
      title="style notes"
      className="style-notes"
    />
  );
};
export const FeaturesOption = ({ data }: { data: string }) => {
  return (
    <FeatureOptions
      items={[{ name: data, code: "features" }]}
      title="features"
      className="dics"
    />
  );
};
export const SizingMaterialOption = ({ data }: { data: string }) => {
  return (
    <FeatureOptions
      items={[{ name: data, code: "sizing_materials" }]}
      title="sizing / materials"
      className="dics"
    />
  );
};
export const ShippingOption = ({ data }: { data: string }) => {
  return (
    <FeatureOptions
      items={[{ name: data, code: "shipping" }]}
      title="shipping"
    />
  );
};
