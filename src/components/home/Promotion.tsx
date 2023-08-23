import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPromotion } from "../../server-side/api";
import { Image } from "../Image";

export const Promotion = (): JSX.Element => {
  const [ref, inView] = useInView();
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const fetchData = async () => {
    const data = await getPromotion();
    setPromotion(data);
  };

  useEffect(() => {
    if (inView) {
      !promotion && fetchData();
    }
  }, [inView]);
  return (
    <div className="home-promotion" ref={ref}>
      <div className="div-rich-text-wrapper">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="heading-leisur-e-l"
        >
          Promotion for Member
        </motion.h1>
        <motion.p
          className="text-wrapper"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Sign up now and get <strong>₱50</strong> coupon
        </motion.p>
        <motion.a
          href={promotion?.path}
          className="link-button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span>join rewards</span>
        </motion.a>
      </div>
      {promotion && (
        <motion.div
          className="home-promotion-img"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={promotion.url}
            alt="Promotion for member"
            ariaLabel="Promotion for member"
          />
        </motion.div>
      )}
    </div>
  );
};
