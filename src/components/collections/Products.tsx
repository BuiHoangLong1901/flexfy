import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getListProducts } from "../../server-side/api";
import { CardProduct } from "../card/Card";
import { FilterModal } from "./FilterModal";
import { ImageAnimation } from "../Image";
import { Pagination } from "../pagination";

type Props = {
  category?: Menu;
  slug?: string;
};

const variants: Variants = {
  enter: { opacity: 0 },
  center: { zIndex: 1, opacity: 1 },
};

export const Products = (props: Props) => {
  const { category, slug } = props;
  const [column, setColumn] = useState<number>(4);
  const [loading, setLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState<{
    data: Product[];
    pagination: IPagination;
  } | null>();
  const handleClickColumn = (value: number) => setColumn(value);
  const fetchProductList = async (query?: Record<string, unknown>) => {
    setLoading(true);
    setProducts(null);
    const response = await getListProducts(query);
    setProducts(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      <ImageAnimation
        ariaLabel={"product-thumbnail"}
        alt={`thumbnail_${slug}`}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
        }}
        initial="enter"
        animate="center"
        variants={variants}
        className="banner"
        src={category?.banner!}
      />
      <FilterModal category={category} slug={slug!} />

      <motion.div
        transition={{
          opacity: { duration: 0.5, delay: 0.7 },
        }}
        initial="enter"
        animate="center"
        variants={variants}
        className="product-container"
      >
        <div className="header-text">
          <span className="title">{category?.name}</span>
          <span className="description">{category?.description}</span>
        </div>
        <div className="header-column">
          <ColumnComponent
            handleClick={handleClickColumn}
            value={2}
            active={column == 2}
          />
          <ColumnComponent
            handleClick={handleClickColumn}
            value={4}
            active={column == 4}
          />
        </div>
      </motion.div>
      <div
        style={{ opacity: loading ? 0.2 : 1 }}
        className={`product-list-container ${
          column == 2 ? "grid_2" : "grid_4"
        } `}
      >
        {!!products?.data.length ? (
          <>
            {products?.data.map((product, index) => {
              return (
                <motion.div
                  transition={{
                    opacity: { duration: 0.5, delay: 0.2 + (index / 10 + 0.2) },
                  }}
                  initial="enter"
                  animate="center"
                  variants={variants}
                >
                  <CardProduct className="product-card" product={product} />
                </motion.div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <Pagination
        onChange={(page) => fetchProductList({ page: page })}
        totalRecords={products?.pagination.totalRecords}
        pageSize={products?.pagination.pageSize}
        defaultValue={products?.pagination.page}
      />
    </>
  );
};

type ColumnComponentProps = {
  active: boolean;
  value: number;
  handleClick: (value: number) => void;
};
const ColumnComponent = (props: ColumnComponentProps) => {
  const { value, active, handleClick } = props;
  return (
    <span
      onClick={() => handleClick(value)}
      className={`text ${active && "active"}`}
    >
      {value}
    </span>
  );
};
