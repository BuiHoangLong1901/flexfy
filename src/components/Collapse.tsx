import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
  className?: string;
  labels: string;
  items: { label: string; code: string }[];
}

export const Collapse = (props: Props) => {
  const { items, labels, className } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="collapse" className={className}>
      <div className="collapse-container">
        <div
          className="collapse-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>{labels}</span>
          <span id="icon-toggle">{isMenuOpen ? "–" : "+"}</span>
        </div>
        <ul className={`collapse-menu ${isMenuOpen ? "show" : ""}`}>
          {items?.map((item, idx) => (
            <li key={"collapse_menu_" + idx}>
              <a
                aria-label={item.label}
                className="collapse-item"
                href={item.code}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

type CollapseAniProps = {
  defaultOpen?: boolean;
  collapseKey?: string;
  btnText?: string;
  className?: { header?: string; root?: string };
  RenderHeader?: React.ReactElement;
  children: React.ReactElement;
  headerIcon?: boolean;
};
export const CollapseAni = (props: CollapseAniProps) => {
  const {
    collapseKey,
    btnText,
    RenderHeader,
    className,
    defaultOpen = false,
    children,
    headerIcon = true,
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`"collapse-box" ${className?.root} `}
      data-idx={collapseKey}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`collapse-container ${className?.header}`}
      >
        {RenderHeader ? (
          RenderHeader
        ) : (
          <>
            <span className="header-left">{btnText}</span>
            {headerIcon && (
              <span className="header-right">{open ? "–" : "+"}</span>
            )}
          </>
        )}
      </div>
      <AnimatePresence initial={true}>
        {open && (
          <motion.div
            key={collapseKey}
            initial="collapsed"
            className={"content"}
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ overflowY: "auto" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
