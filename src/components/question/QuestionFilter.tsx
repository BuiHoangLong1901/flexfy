import { useState } from "react";
import { bandOption, recentOption, sizeOption } from "../../constants/app";
import { Image } from "../Image";
import { SelectBox } from "../SelectBox";
import { AnimatePresence, motion } from "framer-motion";
export const QuestionFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const handleChange = (item: { label: string; value: string }) => {
    console.log(item);
  };
  return (
    <div className="question-filter-wrap">
      <div className="search-form">
        <Image ariaLabel="search_icon" src="/assets/icons/search.svg" alt="" />
        <input type="text" />
      </div>

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
    </div>
  );
};
