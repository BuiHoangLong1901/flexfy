import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import Modal from "../modal";
import { Category } from "./Category";
import { Color } from "./ListColor";
import { Size } from "./ListSize";
import { Menu } from "./Menu";

const variants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
type FilterModalProps = { slug: string; category?: Menu };
export const FilterModal = ({ slug, category }: FilterModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      <motion.div
        transition={{ opacity: { duration: 0.5, delay: 0.4 } }}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="filter-container"
        onClick={() => setModalOpen(true)}
      >
        <span className="filter-text">
          choose your size <span className="filter-icon">+</span>
        </span>
      </motion.div>
      {modalOpen && (
        <Modal cl showModal={modalOpen} setShowModal={() => setModalOpen(true)}>
          <div className="modal-header">
            <span className="title">FILTER BY</span>
            <span onClick={() => setModalOpen(false)} className="close">
              X
            </span>
          </div>
          <div className="modal-content">
            <Category data={category} slug={slug} />
            <Menu />
            <Color slug={slug} />
            <Size slug={slug} />
            <div className="modal-footer">
              <span
                className="modal-button"
                onClick={() => setModalOpen(!modalOpen)}
              >
                <span>X</span>
                <span>Close</span>
              </span>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
