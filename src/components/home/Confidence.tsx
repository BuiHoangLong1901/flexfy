import { motion } from "framer-motion";

export const Confidence = (): JSX.Element => {
  return (
    <div className="home-confidence">
      <div className="div-rich-text-wrapper">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="heading-leisur-e-l"
        >
          Confidence from within
        </motion.h1>
        <motion.p
          className="text-wrapper"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Post your pictures on your instagram or facebook with hashtag #flexfy
        </motion.p>
        <motion.a
          href="/about-us"
          className="link-button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span>about us</span>
        </motion.a>
      </div>
    </div>
  );
};
