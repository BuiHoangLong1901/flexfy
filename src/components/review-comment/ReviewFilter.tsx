import { useState } from "react";
import { bandOption, recentOption, sizeOption } from "../../constants/app";
import { Image } from "../Image";
import { SelectBox } from "../SelectBox";
import { AnimatePresence, motion } from "framer-motion";
export const ReviewFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const handleChange = (item: { label: string; value: string }) => {
    console.log(item);
  };
  return (
    <div className="review-filter-wrap">
      <div className="filter-title">Filter Reviews:</div>
      <div className="search-form">
        <Image ariaLabel="search_icon" src="/assets/icons/search.svg" alt="" />
        <input type="text" />
      </div>
      <AnimatePresence initial={true}>
        {isFilterOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="filter-option-wrap"
          >
            <SelectBox
              IconEnd={
                <Image
                  ariaLabel="end_icon"
                  src="/assets/icons/left.svg"
                  alt="end_icon"
                />
              }
              onChange={handleChange}
              className="filter-option-item"
              defaultValue={sizeOption[1].value}
              items={sizeOption}
            />
            <SelectBox
              IconEnd={
                <Image
                  ariaLabel="end_icon"
                  src="/assets/icons/left.svg"
                  alt="end_icon"
                />
              }
              onChange={handleChange}
              className="filter-option-item"
              defaultValue={bandOption[1].value}
              items={bandOption}
            />
            <SelectBox
              IconEnd={
                <Image
                  ariaLabel="end_icon"
                  src="/assets/icons/left.svg"
                  alt="end_icon"
                />
              }
              onChange={handleChange}
              className="filter-option-item"
              defaultValue={recentOption[1].value}
              items={recentOption}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <Image ariaLabel="filter_icon" src="/assets/icons/filter.svg" alt="" />
        <span>{isFilterOpen ? "Hide Filters" : "More Filters"}</span>
      </button>
    </div>
  );
};
