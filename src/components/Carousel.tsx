import { Fragment, MouseEvent, useEffect, useRef, useState } from "react";
import { Variants, motion } from "framer-motion";

let pos = { top: 0, left: 0, x: 0, y: 0 };

const boxVariant: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, y: 10 },
};

export const Carousel = ({
  items,
  className,
  smooth = 1,
  pagination = false,
  navigation,
}: {
  items: JSX.Element[];
  className?: string;
  smooth?: number;
  pagination?: boolean;
  navigation?: boolean;
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMove, setIsMove] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setSliderIndex(0);
    }
  }, [items]);

  const [state, setState] = useState<{ pre: boolean; next: boolean }>({
    pre: false,
    next: false,
  });

  const handleScroll = (delta: number) => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollLeft += delta;
    }
  };

  const setBtnAction = () => {
    if (scrollRef.current) {
      const totalWidth = Array.from(
        scrollRef.current?.children as unknown as HTMLDivElement[]
      ).reduce((a, c) => a + c.offsetWidth, 0);
      setState((state) => ({
        ...state,
        next: totalWidth >= Number(scrollRef.current?.offsetWidth || 0),
      }));
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scrollRef.current && !isMove) {
      scrollRef.current.style.cursor = "grabbing";
      scrollRef.current.style.scrollBehavior = "unset";
      pos = {
        left: scrollRef.current.scrollLeft,
        top: scrollRef.current.scrollTop,
        x: event.clientX,
        y: event.clientY,
      };
      setIsMove(true);
      setRedirect(true);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { current } = scrollRef;
    event.preventDefault();
    if (current && isMove) {
      setRedirect(false);
      const { x, y, left, top } = pos;
      current.scrollTop = top - (event.clientY - y);
      current.scrollLeft = left - (event.clientX - x) * smooth;
      setSliderIndex(Math.round(current.scrollLeft / current.offsetWidth));
    }
  };

  const handleMouseUpLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    target.onclick = () => redirect;
    if (scrollRef.current && isMove) {
      scrollRef.current.style.cursor = "grab";
      setIsMove(false);
      setRedirect(true);
    }
  };

  const handleDotClick = (index: number) => {
    setSliderIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={boxVariant}
      onAnimationComplete={setBtnAction}
      className={`${className} carousel-common product-detail-images`}
    >
      {navigation && (
        <div className="product-list-action">
          <button
            disabled={!state.pre}
            aria-label="button_previous"
            className="button-previous"
            onClick={() => handleScroll(-400)}
          >
            <span className={`btn-prev ${!state.pre && "disable"}`} />
          </button>
          <button
            disabled={!state.next}
            aria-label="button_next"
            className="button-next"
            onClick={() => handleScroll(400)}
          >
            <span className={`btn-next ${!state.next && "disable"}`} />
          </button>
        </div>
      )}
      <div className="product-detail-slider">
        <div
          className="product-detail-slider-track"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpLeave}
          onMouseLeave={handleMouseUpLeave}
          ref={scrollRef}
          onScroll={({ currentTarget }) => {
            setState({
              next:
                currentTarget.scrollWidth -
                  currentTarget.offsetWidth -
                  currentTarget.scrollLeft >
                1,
              pre: currentTarget.scrollLeft !== 0,
            });
          }}
        >
          {items.map((item, idx) => {
            return <Fragment key={idx}>{item}</Fragment>;
          })}
        </div>
      </div>
      {pagination && (
        <div className="product-detail-slider-footer">
          <ul className="product-detail-dots">
            {Array.from({ length: items.length }, (_, index) => (
              <li
                key={"dot_" + index}
                aria-label={"dot_" + index}
                onClick={() => handleDotClick(index)}
                className={`${index === sliderIndex && "active"}`}
              />
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
