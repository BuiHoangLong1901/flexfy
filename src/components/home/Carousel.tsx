import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { wrap } from "popmotion";
import { Image, ImageAnimation } from "../Image";

const variants: Variants = {
  enter: { opacity: 0, translateX: "none" },
  center: { zIndex: 1, opacity: 1, translateX: "none" },
  exit: { zIndex: 0, opacity: 0.5, translateX: "none" },
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type Props = { images?: string[]; autoPlay?: boolean; duration?: number };
export const Carousel = (props: Props) => {
  const { images, autoPlay, duration = 5000 } = props;
  const [[page, direction], setPage] = useState([0, 0]);
  if (!images) return <></>;

  const imageIndex = wrap(0, images?.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <div className="carousel-wrapper">
      <AnimatePresence initial={false} custom={direction}>
        <ImageAnimation
          className="carousel-img"
          alt="carousel_image_with_animation"
          ariaLabel="carousel_image_with_animation"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
          }}
          drag="x"
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.y);
            if (swipe <= 0) {
              paginate(+1);
            } else if (swipe > 0) {
              paginate(-1);
            }
          }}
          loading="eager"
        />
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <Image
          alt={"arrow-right"}
          ariaLabel={"arrow-right"}
          src={"../assets/icons/arrow-left.svg"}
          height="50"
          width="50"
        />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <Image
          alt={"arrow-right"}
          ariaLabel={"arrow-right"}
          src={"../assets/icons/arrow-left.svg"}
          height="50"
          width="50"
        />
      </div>
    </div>
  );
};
