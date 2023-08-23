import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ showModal, children, className }: any) => {
  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={`modal-container ${className}`}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="drawler"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "grey",
          opacity: 0.5,
        }}
      />
    </>
  );
};

export default Modal;
