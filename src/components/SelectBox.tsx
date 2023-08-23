import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Image } from "./Image";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
interface SelectBoxType {
  label?: string;
  defaultValue: string;
  items: { label: string; value: string }[];
  className?: string;
  IconEnd?: React.ReactElement;
  name?: string;
  onChange?: (item: { label: string; value: string }) => void;
}
export const SelectBox = ({
  label,
  defaultValue,
  items,
  className,
  IconEnd,
  name,
  onChange,
}: SelectBoxType) => {
  const getLabelByValue = (value: string) => {
    const option = items.find((option) => option.value === value);
    return option ? option.label : "Unknown";
  };
  const [showDropDown, setShowDropdown] = useState(false);

  const selectBoxRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
  const handleOutSideClick = (e: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const handleChangeSelect = (item: { label: string; value: string }) => {
    setSelectedOption(item);
    onChange && onChange(item);
  };
  return (
    <div
      ref={selectBoxRef}
      className={`select ${className}`}
      onClick={toggleDropdown}
    >
      {label && (
        <div className="select-label">
          <span>{label}</span>
        </div>
      )}
      <input
        className="select-value"
        name={name}
        readOnly
        value={selectedOption?.label || getLabelByValue(defaultValue)}
      />
      {showDropDown && (
        <motion.ul
          className="select-options"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {items.length ? (
            items.map((item, idx) => (
              <li
                key={item.value + idx}
                onClick={() => handleChangeSelect(item)}
              >
                <div className="select-option">{item.label}</div>
              </li>
            ))
          ) : (
            <li>
              <div className="select-option">no options</div>
            </li>
          )}
        </motion.ul>
      )}
      <div className="select-icon-close">
        {IconEnd ?? (
          <Image
            src="/assets/icons/down.svg"
            alt="arrow-down"
            ariaLabel="select_arrow-down"
          />
        )}
      </div>
    </div>
  );
};
