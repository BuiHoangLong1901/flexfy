import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { S as StarIcon, I as ImageAnimation, a as Image, C as CollapseAni, g as getColors, b as getSizes, c as getMenu, d as getListProducts, e as getCategoryBySlug, $ as $$Layout } from './_...any_.astro.2601c4cf.mjs';
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.daf0d03a.mjs';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const currencyFormat = (number, currency, maxFraction) => {
  return new Intl.NumberFormat("en-US", {
    style: currency && "currency",
    currency: currency ?? "USD",
    maximumFractionDigits: maxFraction ?? 0
  }).format(number);
};

const MATCH_EMAIL = new RegExp(
  /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA]+)*$/
);

const Rating = (props) => {
  const { rating, color = "#ffb4b4", width, height } = props;
  return /* @__PURE__ */ jsx("ul", { className: "product-rating", children: Array.from(Array(5)).map((_, idx) => /* @__PURE__ */ jsx("li", { className: "rating-list", children: /* @__PURE__ */ jsx(
    StarIcon,
    {
      width,
      height,
      fill: idx < rating ? color : "transparent",
      stroke: color
    }
  ) }, "star_" + idx)) });
};

const variants$2 = {
  enter: { opacity: 0, translateX: "none" },
  center: { zIndex: 1, opacity: 1 },
  exit: { zIndex: 0, opacity: 0.5, translateX: "none" }
};
const CardProduct = (props) => {
  const { className, product, extraComponent } = props;
  const [optionIndex, setOptionIndex] = useState(0);
  return /* @__PURE__ */ jsxs("div", { id: "product", className, children: [
    /* @__PURE__ */ jsx("div", { className: "product-thumbnail", children: /* @__PURE__ */ jsxs("a", { href: "/products/" + product.slug, children: [
      product?.options && /* @__PURE__ */ jsx("div", { className: "product-image", children: /* @__PURE__ */ jsx(
        ImageAnimation,
        {
          src: product?.options[optionIndex]?.thumbnail ?? "",
          ariaLabel: "product-thumbnail",
          alt: `thumbnail_${product.name}_${optionIndex}`,
          transition: {
            opacity: { duration: 0.5, delay: 0.2 }
          },
          initial: "enter",
          animate: "center",
          variants: variants$2
        },
        optionIndex
      ) }),
      product.isNew && /* @__PURE__ */ jsx("div", { className: "product-new-arrival", children: /* @__PURE__ */ jsx("span", { children: "NEW ARRIVAL" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "product-content", children: [
      product.rating && /* @__PURE__ */ jsxs("div", { className: "product-star", children: [
        /* @__PURE__ */ jsx(Rating, { rating: product.rating }),
        /* @__PURE__ */ jsxs("span", { className: "product-review", children: [
          product.totalRating,
          " Reviews"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "product-title", children: /* @__PURE__ */ jsx("span", { children: product.name }) }),
      /* @__PURE__ */ jsxs("div", { className: "product-price", children: [
        product.originalPrice && /* @__PURE__ */ jsx("span", { className: "original-price", children: currencyFormat(product.originalPrice, "USD") }),
        /* @__PURE__ */ jsx("span", { children: currencyFormat(product.price, "USD") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "product-options", children: /* @__PURE__ */ jsx("ul", { className: "product-options-list", children: product?.options?.map((option, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `circle ${idx === optionIndex && "active"}`,
          style: { background: option.color },
          onClick: () => setOptionIndex(idx)
        }
      ) }, "product_options_" + option.code)) }) }),
      extraComponent
    ] })
  ] });
};
const CardCategory = (props) => {
  const { category } = props;
  return /* @__PURE__ */ jsxs("div", { id: "category", className: `card-category category-section`, children: [
    /* @__PURE__ */ jsx("div", { className: "card-image", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: category.url,
        ariaLabel: "card-thumbnail",
        alt: category.name
      }
    ) }),
    /* @__PURE__ */ jsx("a", { className: "card-button", href: "collections" + category.path, children: /* @__PURE__ */ jsx("span", { children: category.name }) })
  ] });
};
const CardProductRaving = (props) => {
  const { item } = props;
  return /* @__PURE__ */ jsxs("div", { className: "product-raving", children: [
    /* @__PURE__ */ jsx("div", { className: "product-thumbnail", children: /* @__PURE__ */ jsx("a", { href: "/products/" + item.product.slug, children: /* @__PURE__ */ jsx("div", { className: "product-image", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: item.product.thumbnail,
        ariaLabel: "product-thumbnail",
        alt: item.product.name
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "product-content", children: [
      /* @__PURE__ */ jsx("div", { className: "product-star", children: /* @__PURE__ */ jsx(Rating, { rating: item.rating }) }),
      /* @__PURE__ */ jsx("div", { className: "product-rate", children: /* @__PURE__ */ jsxs("span", { children: [
        "“",
        item.comment,
        "”"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "product-author", children: /* @__PURE__ */ jsx("span", { children: item.name }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/products/" + item.product.slug,
          className: "product-shop-style",
          children: "SHOP STYLE"
        }
      )
    ] })
  ] });
};

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};
const Modal = ({ showModal, children, className }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: showModal && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: `modal-container ${className}`,
        variants: backdrop,
        initial: "hidden",
        animate: "visible",
        exit: "hidden",
        children
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "drawler",
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "grey",
          opacity: 0.5
        }
      }
    )
  ] });
};

const boxVariant$3 = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, x: -10 }
};
const Category = ({ data, slug }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  if (!data || !data?.name)
    return /* @__PURE__ */ jsx(Fragment, {});
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      variants: boxVariant$3,
      initial: "hidden",
      animate: control,
      className: "category-container",
      children: /* @__PURE__ */ jsx(
        CollapseAni,
        {
          collapseKey: "menu_collapse",
          btnText: data.name,
          className: { header: "header" },
          headerIcon: Number(data.subMenu.length) > 0,
          defaultOpen: true,
          children: /* @__PURE__ */ jsx(Fragment, { children: data?.subMenu?.map((item, idx) => /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => setSelected(item),
              className: "item",
              children: /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    color: selected?.slug == item?.slug ? "black" : "",
                    fontWeight: selected?.slug == item?.slug ? "bold" : ""
                  },
                  className: "item-text",
                  children: item.name
                }
              )
            },
            "menu_" + idx
          )) })
        }
      )
    }
  );
};

const useProductOptionStore = create()(
  persist(
    (set, get) => ({
      sizes: [],
      colors: [],
      categories: [],
      menu: [],
      footer: [],
      addOption: (name, data) => set({ [name]: data })
    }),
    {
      name: "product-option",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const boxVariant$2 = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 } },
  hidden: { opacity: 0, x: -30 }
};
const Color = ({ slug }) => {
  const control = useAnimation();
  const { addOption: setColors, colors } = useProductOptionStore();
  const [selected, setSelected] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getColors();
    setColors("colors", data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!colors || colors.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      variants: boxVariant$2,
      initial: "hidden",
      animate: control,
      className: "color-container",
      children: [
        /* @__PURE__ */ jsx("div", { className: "header", children: /* @__PURE__ */ jsx("span", { children: "FILTER BY COLOR" }) }),
        /* @__PURE__ */ jsx("div", { className: "content", children: colors?.map((item, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => {
              setSelected(item);
            },
            className: "item",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "item-color",
                  style: {
                    backgroundColor: item.color,
                    borderColor: selected?.color == item.color ? "black" : ""
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    fontWeight: selected?.color == item.color ? "bold" : ""
                  },
                  className: "item-text",
                  children: item.name
                }
              )
            ]
          },
          "color_" + idx
        )) })
      ]
    }
  );
};

const boxVariant$1 = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 } },
  hidden: { opacity: 0, x: -40 }
};
const Size = ({ slug }) => {
  const { addOption: setSizes, sizes } = useProductOptionStore();
  const control = useAnimation();
  const [selected, setSelected] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getSizes();
    setSizes("sizes", data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!sizes || sizes.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      variants: boxVariant$1,
      initial: "hidden",
      animate: control,
      className: "size-container",
      children: [
        /* @__PURE__ */ jsx("div", { className: "header", children: /* @__PURE__ */ jsx("span", { children: "FILTER BY SIZE" }) }),
        /* @__PURE__ */ jsx("div", { className: "content", children: sizes?.map((item, idx) => /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              setSelected(item);
            },
            style: {
              backgroundColor: selected?.code == item.code ? "#ffb4b4" : ""
            },
            className: "item item-size",
            children: /* @__PURE__ */ jsx("span", { className: "item-text", children: item.name })
          },
          "size_" + idx
        )) })
      ]
    }
  );
};

const boxVariant = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
  hidden: { opacity: 0, x: -20 }
};
const Menu = () => {
  const control = useAnimation();
  const { addOption: setMenu, menu } = useProductOptionStore();
  const [selected, setSelected] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getMenu();
    console.log("%cMenu.tsx line:20 data", "color: #007acc;", data);
    setMenu("menu", data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!menu || menu.length == 0) && fetchData();
    }
  }, [control, inView]);
  if (!menu)
    return /* @__PURE__ */ jsx(Fragment, {});
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      variants: boxVariant,
      initial: "hidden",
      animate: control,
      className: "menu-container",
      children: /* @__PURE__ */ jsx(
        CollapseAni,
        {
          collapseKey: "category",
          className: { header: "header" },
          btnText: "Category",
          headerIcon: Number(menu?.length) > 0,
          defaultOpen: true,
          children: /* @__PURE__ */ jsx(Fragment, { children: menu?.map((item, idx) => /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => {
                setSelected(item);
              },
              className: "item",
              children: /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    color: selected?.slug == item?.slug ? "black" : "",
                    fontWeight: selected?.slug == item.slug ? "bold" : ""
                  },
                  className: "item-text",
                  children: item.name
                }
              )
            },
            "category_" + item.name + "_" + idx
          )) })
        }
      )
    }
  );
};

const variants$1 = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};
const FilterModal = ({ slug, category }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return /* @__PURE__ */ jsxs(AnimatePresence, { initial: false, onExitComplete: () => null, children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        transition: { opacity: { duration: 0.5, delay: 0.4 } },
        initial: "hidden",
        animate: "visible",
        variants: variants$1,
        className: "filter-container",
        onClick: () => setModalOpen(true),
        children: /* @__PURE__ */ jsxs("span", { className: "filter-text", children: [
          "choose your size ",
          /* @__PURE__ */ jsx("span", { className: "filter-icon", children: "+" })
        ] })
      }
    ),
    modalOpen && /* @__PURE__ */ jsxs(Modal, { cl: true, showModal: modalOpen, setShowModal: () => setModalOpen(true), children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("span", { className: "title", children: "FILTER BY" }),
        /* @__PURE__ */ jsx("span", { onClick: () => setModalOpen(false), className: "close", children: "X" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsx(Category, { data: category, slug }),
        /* @__PURE__ */ jsx(Menu, {}),
        /* @__PURE__ */ jsx(Color, { slug }),
        /* @__PURE__ */ jsx(Size, { slug }),
        /* @__PURE__ */ jsx("div", { className: "modal-footer", children: /* @__PURE__ */ jsxs(
          "span",
          {
            className: "modal-button",
            onClick: () => setModalOpen(!modalOpen),
            children: [
              /* @__PURE__ */ jsx("span", { children: "X" }),
              /* @__PURE__ */ jsx("span", { children: "Close" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
};

const Pagination = (props) => {
  const { onChange, totalRecords, defaultValue, pageSize } = props;
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const totalPages = Number(totalRecords) / Number(pageSize);
  const onChangePage = (page) => {
    onChange && onChange(page);
    setValue(page);
  };
  return /* @__PURE__ */ jsxs("div", { id: "pagination", children: [
    Number(value) > 1 && /* @__PURE__ */ jsx("span", { onClick: () => onChangePage(Number(value) - 1), className: "prev", children: "Prev" }),
    /* @__PURE__ */ jsxs("div", { className: "page-index", children: [
      Number(value) >= 3 && /* @__PURE__ */ jsx("span", { onClick: () => onChangePage(1), children: "1" }),
      Number(value) >= 3 && /* @__PURE__ */ jsx("span", { className: "no-index", children: "..." }),
      Array.from({ length: Number(totalPages.toFixed(0)) }, (_, i) => {
        const index = i + 1;
        if (index == Number(value) - 1 || index == Number(value) + 1 || index == value)
          return /* @__PURE__ */ jsx(
            "span",
            {
              onClick: () => {
                if (index == value)
                  return;
                onChangePage(index);
              },
              className: `${index == value && "active"}`,
              children: index
            }
          );
        return /* @__PURE__ */ jsx(Fragment, {});
      }),
      Number(totalPages) - Number(value) >= 2 && /* @__PURE__ */ jsx("span", { className: "no-index", children: "..." }),
      Number(totalPages) - Number(value) >= 1 && /* @__PURE__ */ jsx("span", { onClick: () => onChangePage(Number(totalPages.toFixed(0))), children: totalPages.toFixed(0) })
    ] }),
    Number(value) * Number(pageSize) < Number(totalRecords) && /* @__PURE__ */ jsx("span", { onClick: () => onChangePage(Number(value) + 1), className: "next", children: "Next" })
  ] });
};

const variants = {
  enter: { opacity: 0 },
  center: { zIndex: 1, opacity: 1 }
};
const Products = (props) => {
  const { category, slug } = props;
  const [column, setColumn] = useState(4);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  const handleClickColumn = (value) => setColumn(value);
  const fetchProductList = async (query) => {
    setLoading(true);
    setProducts(null);
    const response = await getListProducts(query);
    setProducts(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchProductList();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ImageAnimation,
      {
        ariaLabel: "product-thumbnail",
        alt: `thumbnail_${slug}`,
        transition: {
          opacity: { duration: 0.5, delay: 0.2 }
        },
        initial: "enter",
        animate: "center",
        variants,
        className: "banner",
        src: category?.banner
      }
    ),
    /* @__PURE__ */ jsx(FilterModal, { category, slug }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        transition: {
          opacity: { duration: 0.5, delay: 0.7 }
        },
        initial: "enter",
        animate: "center",
        variants,
        className: "product-container",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "header-text", children: [
            /* @__PURE__ */ jsx("span", { className: "title", children: category?.name }),
            /* @__PURE__ */ jsx("span", { className: "description", children: category?.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "header-column", children: [
            /* @__PURE__ */ jsx(
              ColumnComponent,
              {
                handleClick: handleClickColumn,
                value: 2,
                active: column == 2
              }
            ),
            /* @__PURE__ */ jsx(
              ColumnComponent,
              {
                handleClick: handleClickColumn,
                value: 4,
                active: column == 4
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: { opacity: loading ? 0.2 : 1 },
        className: `product-list-container ${column == 2 ? "grid_2" : "grid_4"} `,
        children: !!products?.data.length ? /* @__PURE__ */ jsx(Fragment, { children: products?.data.map((product, index) => {
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              transition: {
                opacity: { duration: 0.5, delay: 0.2 + (index / 10 + 0.2) }
              },
              initial: "enter",
              animate: "center",
              variants,
              children: /* @__PURE__ */ jsx(CardProduct, { className: "product-card", product })
            }
          );
        }) }) : /* @__PURE__ */ jsx(Fragment, {})
      }
    ),
    /* @__PURE__ */ jsx(
      Pagination,
      {
        onChange: (page) => fetchProductList({ page }),
        totalRecords: products?.pagination.totalRecords,
        pageSize: products?.pagination.pageSize,
        defaultValue: products?.pagination.page
      }
    )
  ] });
};
const ColumnComponent = (props) => {
  const { value, active, handleClick } = props;
  return /* @__PURE__ */ jsx(
    "span",
    {
      onClick: () => handleClick(value),
      className: `text ${active && "active"}`,
      children: value
    }
  );
};

const $$Astro$1 = createAstro();
const $$slug$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$slug$1;
  const { slug } = Astro2.params;
  const category = await getCategoryBySlug(slug);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": slug?.toLocaleUpperCase() }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div class="collection-container">
    <div class="collection-left">
      ${renderComponent($$result2, "Category", Category, { "client:load": true, "data": category, "slug": slug, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/Category", "client:component-export": "Category" })}
      ${renderComponent($$result2, "Menu", Menu, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/Menu", "client:component-export": "Menu" })}
      ${renderComponent($$result2, "Color", Color, { "client:load": true, "slug": slug, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/ListColor", "client:component-export": "Color" })}
      ${renderComponent($$result2, "Size", Size, { "client:load": true, "slug": slug, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/ListSize", "client:component-export": "Size" })}
    </div>
    <div class="collection-right">
      ${renderComponent($$result2, "Products", Products, { "client:load": true, "slug": slug, "category": category, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/collections/Products", "client:component-export": "Products" })}
    </div>
  </div>
` })}`;
}, "D:/src/src/pages/collections/[slug].astro", void 0);

const $$file$1 = "D:/src/src/pages/collections/[slug].astro";
const $$url$1 = "/collections/[slug]";

const _slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const title = slug?.replace(/-/g, " ").replace(/\b[a-z]/g, function(slug2) {
    return slug2.toUpperCase();
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Flexfy - ${title ?? "Product Detail"}` }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div id="productDetail">
    ${renderComponent($$result2, "ProductDetail", null, { "slug": slug, "client:only": "react", "client:component-hydration": "only", "client:component-path": "D:/src/src/components/product-detail", "client:component-export": "ProductDetail" })}
  </div>
` })}`;
}, "D:/src/src/pages/products/[slug].astro", void 0);

const $$file = "D:/src/src/pages/products/[slug].astro";
const $$url = "/products/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { CardProduct as C, MATCH_EMAIL as M, _slug_$1 as _, CardCategory as a, CardProductRaving as b, _slug_ as c };
