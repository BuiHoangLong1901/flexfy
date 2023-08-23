import { useEffect, useState } from "react";

type Props = {
  totalRecords?: number;
  pageSize?: number;
  defaultValue?: number;
  onChange?: (page: number) => void;
};
export const Pagination = (props: Props) => {
  const { onChange, totalRecords, defaultValue, pageSize } = props;
  const [value, setValue] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const totalPages = Number(totalRecords) / Number(pageSize);

  const onChangePage = (page: number) => {
    onChange && onChange(page);
    setValue(page);
  };
  return (
    <div id="pagination">
      {Number(value) > 1 && (
        <span onClick={() => onChangePage(Number(value) - 1)} className="prev">
          Prev
        </span>
      )}
      <div className="page-index">
        {Number(value) >= 3 && <span onClick={() => onChangePage(1)}>1</span>}
        {Number(value) >= 3 && <span className="no-index">...</span>}
        {Array.from({ length: Number(totalPages.toFixed(0)) }, (_, i) => {
          const index = i + 1;
          if (
            index == Number(value) - 1 ||
            index == Number(value) + 1 ||
            index == value
          )
            return (
              <span
                onClick={() => {
                  if (index == value) return;
                  onChangePage(index);
                }}
                className={`${index == value && "active"}`}
              >
                {index}
              </span>
            );
          return <></>;
        })}

        {Number(totalPages) - Number(value) >= 2 && (
          <span className="no-index">...</span>
        )}

        {Number(totalPages) - Number(value) >= 1 && (
          <span onClick={() => onChangePage(Number(totalPages.toFixed(0)))}>
            {totalPages.toFixed(0)}
          </span>
        )}
      </div>
      {Number(value) * Number(pageSize) < Number(totalRecords) && (
        <span onClick={() => onChangePage(Number(value) + 1)} className="next">
          Next
        </span>
      )}
    </div>
  );
};
