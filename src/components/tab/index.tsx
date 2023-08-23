import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type Tab = { label: string; render: React.ReactElement; value: number };
export default function Tabs(props: {
  tabs: Tab[];
  defaultValue?: number;
  className?: string;
  handleChangeTab?: (index: number) => void;
}) {
  const { tabs, defaultValue = 0, handleChangeTab, className } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[defaultValue]);
  useEffect(() => {
    setSelectedTab(tabs[defaultValue]);
  }, [tabs, defaultValue]);
  return (
    <div className={className}>
      <div className="tabs-container">
        <nav>
          <ul>
            {tabs.map((item: Tab, index: number) => (
              <li
                key={item.label}
                className={item === selectedTab ? "selected" : ""}
                onClick={() => {
                  setSelectedTab(item);
                  handleChangeTab && handleChangeTab(index);
                }}
              >
                {item.label}
                <div className="header-value">
                  <span className="total-value">{item.value || 0}</span>
                </div>
                {item === selectedTab ? (
                  <motion.div className="underline" layoutId="underline" />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab.label : "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedTab.render}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
