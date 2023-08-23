import { Variants, motion, PanInfo } from "framer-motion";

type ImageProps = {
  src: string;
  ariaLabel: string;
  alt: string;
  id?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  onClick?: () => any;
};

export const Image = (props: ImageProps) => {
  const { ariaLabel, ...other } = props;
  return <img {...other} aria-label={ariaLabel} />;
};
type ImageAnimationProps = {
  custom?: any;
  key?: string | number;
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
  transition?: Record<string, any>;
  drag?: "x" | "y";
  loading?: "lazy" | "eager";
  dragElastic?: number;
  onDragEnd?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
};
export const ImageAnimation = (props: ImageAnimationProps & ImageProps) => {
  const { ariaLabel, loading = "lazy", ...other } = props;
  return <motion.img {...other} aria-label={ariaLabel} loading={loading} />;
};
