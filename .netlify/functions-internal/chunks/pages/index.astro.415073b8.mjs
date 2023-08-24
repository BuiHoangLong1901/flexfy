import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent } from '../astro.9f4d6c5c.mjs';
import { AnimatePresence, useAnimation, motion } from 'framer-motion';
import { useState, useEffect, useRef, Fragment as Fragment$1 } from 'react';
import { useInView } from 'react-intersection-observer';
import { d as ImageAnimation, I as Image, k as getBanners, l as getProductsByHome, m as getPromotion, n as getCommunities, o as getAdvertises, $ as $$Layout } from './_...any_.astro.60fe0e4b.mjs';
import { wrap } from 'popmotion';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { C as CardProduct, a as CardCategory, b as CardProductRaving } from './_slug_.astro.18ed53a1.mjs';
/* empty css                           */
const variants = {
  enter: {
    opacity: 0,
    translateX: "none"
  },
  center: {
    zIndex: 1,
    opacity: 1,
    translateX: "none"
  },
  exit: {
    zIndex: 0,
    opacity: 0.5,
    translateX: "none"
  }
};
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};
const Carousel$1 = (props) => {
  const {
    images,
    autoPlay,
    duration = 5e3
  } = props;
  const [[page, direction], setPage] = useState([0, 0]);
  if (!images)
    return /* @__PURE__ */ jsx(Fragment, {});
  const imageIndex = wrap(0, images?.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "carousel-wrapper",
    children: [/* @__PURE__ */ jsx(AnimatePresence, {
      initial: false,
      custom: direction,
      children: /* @__PURE__ */ jsx(ImageAnimation, {
        className: "carousel-img",
        alt: "carousel_image_with_animation",
        ariaLabel: "carousel_image_with_animation",
        src: images[imageIndex],
        custom: direction,
        variants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: {
          opacity: {
            duration: 0.8,
            delay: 0.2
          }
        },
        drag: "x",
        dragElastic: 1,
        onDragEnd: (e, {
          offset,
          velocity
        }) => {
          const swipe = swipePower(offset.x, velocity.y);
          if (swipe <= 0) {
            paginate(1);
          } else if (swipe > 0) {
            paginate(-1);
          }
        },
        loading: "eager"
      }, page)
    }), /* @__PURE__ */ jsx("div", {
      className: "next",
      onClick: () => paginate(1),
      children: /* @__PURE__ */ jsx(Image, {
        alt: "arrow-right",
        ariaLabel: "arrow-right",
        src: "../assets/icons/arrow-left.svg",
        height: "50",
        width: "50"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "prev",
      onClick: () => paginate(-1),
      children: /* @__PURE__ */ jsx(Image, {
        alt: "arrow-right",
        ariaLabel: "arrow-right",
        src: "../assets/icons/arrow-left.svg",
        height: "50",
        width: "50"
      })
    })]
  });
};
__astro_tag_component__(Carousel$1, "@astrojs/react");

const boxVariant$2 = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  },
  hidden: {
    opacity: 0,
    y: 10
  }
};
const Banner = () => {
  const control = useAnimation();
  const [banners, setBanners] = useState(null);
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getBanners();
    if (data) {
      setBanners(data);
      document.head.innerHTML += `<link rel="preload" as="image" href="${data[0].url}">`;
    }
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!banners || banners.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsx(motion.div, {
    ref,
    variants: boxVariant$2,
    initial: "hidden",
    animate: control,
    children: banners && /* @__PURE__ */ jsxs("div", {
      className: "home-banner",
      children: [/* @__PURE__ */ jsx(Carousel$1, {
        images: banners.map((banner) => banner.url)
      }), /* @__PURE__ */ jsx("a", {
        "aria-label": "shop-sales",
        href: "/collections/sales",
        children: /* @__PURE__ */ jsx("div", {
          className: "link-shop-sale",
          children: /* @__PURE__ */ jsx("div", {
            className: "shop-sale",
            children: "shop sale"
          })
        })
      })]
    })
  });
};
__astro_tag_component__(Banner, "@astrojs/react");

const Confidence = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "home-confidence",
    children: /* @__PURE__ */ jsxs("div", {
      className: "div-rich-text-wrapper",
      children: [/* @__PURE__ */ jsx(motion.h1, {
        initial: {
          opacity: 0
        },
        whileInView: {
          opacity: 1
        },
        viewport: {
          once: true
        },
        transition: {
          duration: 0.5,
          delay: 0.2
        },
        className: "heading-leisur-e-l",
        children: "Confidence from within"
      }), /* @__PURE__ */ jsx(motion.p, {
        className: "text-wrapper",
        initial: {
          opacity: 0,
          y: 10
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5,
          delay: 0.05
        },
        children: "Post your pictures on your instagram or facebook with hashtag #flexfy"
      }), /* @__PURE__ */ jsx(motion.a, {
        href: "/about-us",
        className: "link-button",
        initial: {
          opacity: 0,
          y: 10
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5,
          delay: 0.15
        },
        children: /* @__PURE__ */ jsx("span", {
          children: "about us"
        })
      })]
    })
  });
};
__astro_tag_component__(Confidence, "@astrojs/react");

let pos = {
  top: 0,
  left: 0,
  x: 0,
  y: 0
};
const boxVariant$1 = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  },
  hidden: {
    opacity: 0,
    y: 10
  }
};
const Carousel = ({
  items,
  className,
  smooth = 1,
  pagination = false,
  navigation
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isMove, setIsMove] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setSliderIndex(0);
    }
  }, [items]);
  const [state, setState] = useState({
    pre: false,
    next: false
  });
  const handleScroll = (delta) => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollLeft += delta;
    }
  };
  const setBtnAction = () => {
    if (scrollRef.current) {
      const totalWidth = Array.from(scrollRef.current?.children).reduce((a, c) => a + c.offsetWidth, 0);
      setState((state2) => ({
        ...state2,
        next: totalWidth >= Number(scrollRef.current?.offsetWidth || 0)
      }));
    }
  };
  const handleMouseDown = (event) => {
    event.preventDefault();
    if (scrollRef.current && !isMove) {
      scrollRef.current.style.cursor = "grabbing";
      scrollRef.current.style.scrollBehavior = "unset";
      pos = {
        left: scrollRef.current.scrollLeft,
        top: scrollRef.current.scrollTop,
        x: event.clientX,
        y: event.clientY
      };
      setIsMove(true);
      setRedirect(true);
    }
  };
  const handleMouseMove = (event) => {
    const {
      current
    } = scrollRef;
    event.preventDefault();
    if (current && isMove) {
      setRedirect(false);
      const {
        x,
        y,
        left,
        top
      } = pos;
      current.scrollTop = top - (event.clientY - y);
      current.scrollLeft = left - (event.clientX - x) * smooth;
      setSliderIndex(Math.round(current.scrollLeft / current.offsetWidth));
    }
  };
  const handleMouseUpLeave = (event) => {
    event.preventDefault();
    const target = event.target;
    target.onclick = () => redirect;
    if (scrollRef.current && isMove) {
      scrollRef.current.style.cursor = "grab";
      setIsMove(false);
      setRedirect(true);
    }
  };
  const handleDotClick = (index) => {
    setSliderIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxs(motion.div, {
    animate: {
      opacity: 1,
      y: 0
    },
    initial: {
      opacity: 0
    },
    whileInView: {
      opacity: 1
    },
    viewport: {
      once: true
    },
    transition: {
      duration: 0.5,
      delay: 0.2
    },
    variants: boxVariant$1,
    onAnimationComplete: setBtnAction,
    className: `${className} carousel-common product-detail-images`,
    children: [navigation && /* @__PURE__ */ jsxs("div", {
      className: "product-list-action",
      children: [/* @__PURE__ */ jsx("button", {
        disabled: !state.pre,
        "aria-label": "button_previous",
        className: "button-previous",
        onClick: () => handleScroll(-400),
        children: /* @__PURE__ */ jsx("span", {
          className: `btn-prev ${!state.pre && "disable"}`
        })
      }), /* @__PURE__ */ jsx("button", {
        disabled: !state.next,
        "aria-label": "button_next",
        className: "button-next",
        onClick: () => handleScroll(400),
        children: /* @__PURE__ */ jsx("span", {
          className: `btn-next ${!state.next && "disable"}`
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "product-detail-slider",
      children: /* @__PURE__ */ jsx("div", {
        className: "product-detail-slider-track",
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUpLeave,
        onMouseLeave: handleMouseUpLeave,
        ref: scrollRef,
        onScroll: ({
          currentTarget
        }) => {
          setState({
            next: currentTarget.scrollWidth - currentTarget.offsetWidth - currentTarget.scrollLeft > 1,
            pre: currentTarget.scrollLeft !== 0
          });
        },
        children: items.map((item, idx) => {
          return /* @__PURE__ */ jsx(Fragment$1, {
            children: item
          }, idx);
        })
      })
    }), pagination && /* @__PURE__ */ jsx("div", {
      className: "product-detail-slider-footer",
      children: /* @__PURE__ */ jsx("ul", {
        className: "product-detail-dots",
        children: Array.from({
          length: items.length
        }, (_, index) => /* @__PURE__ */ jsx("li", {
          "aria-label": "dot_" + index,
          onClick: () => handleDotClick(index),
          className: `${index === sliderIndex && "active"}`
        }, "dot_" + index))
      })
    })]
  });
};
__astro_tag_component__(Carousel, "@astrojs/react");

const boxVariant = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  },
  hidden: {
    opacity: 0,
    y: 10
  }
};
const RenderProducts = (items, childComponent) => {
  if (!items)
    return [/* @__PURE__ */ jsx(Fragment, {})];
  return items?.map((product, index) => childComponent(product, index));
};
const Product = (props) => {
  const {
    title,
    url,
    link,
    className,
    childComponent
  } = props;
  const control = useAnimation();
  const [products, setProducts] = useState(null);
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getProductsByHome(url);
    setProducts(data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!products || products.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsx(motion.div, {
    initial: "hidden",
    animate: control,
    ref,
    variants: boxVariant,
    transition: {
      duration: 0.5
    },
    id: "product-list",
    className,
    children: /* @__PURE__ */ jsxs("div", {
      className: "product-list-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "product-list-header",
        children: /* @__PURE__ */ jsxs("div", {
          className: "list-title",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "heading-best",
            children: title
          }), link && /* @__PURE__ */ jsx("a", {
            className: "link-button",
            href: link,
            children: /* @__PURE__ */ jsx("span", {
              children: "shop now"
            })
          })]
        })
      }), /* @__PURE__ */ jsx(Carousel, {
        items: RenderProducts(products, childComponent),
        className: "product-list",
        smooth: 2,
        navigation: true
      })]
    })
  });
};
const BestSellerSection = () => /* @__PURE__ */ jsx("div", {
  id: "best-seller",
  children: /* @__PURE__ */ jsx(Product, {
    title: "Best Seller",
    url: "/home/best-sellers",
    link: "/collections/sales",
    childComponent: (product, index) => /* @__PURE__ */ jsx(CardProduct, {
      product
    }, "best_sellers_" + product.name + `_${index}`)
  })
});
const SaleOffProductsSection = () => /* @__PURE__ */ jsx("div", {
  id: "sale-off-product",
  children: /* @__PURE__ */ jsx(Product, {
    title: "Up to 30% Off",
    url: "/home/sale-off-products",
    link: "/collections/sale-off-products",
    childComponent: (product, index) => /* @__PURE__ */ jsx(CardProduct, {
      product
    }, "sal_off_products_" + product.name + `_${index}`)
  })
});
const SaleOffCategoriesSection = () => /* @__PURE__ */ jsx("div", {
  id: "sale-off-category",
  children: /* @__PURE__ */ jsx(Product, {
    title: "15% Off Top Categories",
    url: "/home/sale-off-categories",
    link: "/collections/sale-off-categories",
    childComponent: (category, index) => /* @__PURE__ */ jsx(CardCategory, {
      category
    }, "sale_off_categories_" + category.name + `_${index}`)
  })
});
const ProductRavingSection = () => /* @__PURE__ */ jsx("div", {
  id: "product-raving-section",
  children: /* @__PURE__ */ jsx(Product, {
    title: "Our Crew is Raving",
    url: "/home/crew-raving",
    childComponent: (item, index) => /* @__PURE__ */ jsx(CardProductRaving, {
      item
    }, "raving_product_" + item.name + `_${index}`)
  })
});
__astro_tag_component__(Product, "@astrojs/react");
__astro_tag_component__(BestSellerSection, "@astrojs/react");
__astro_tag_component__(SaleOffProductsSection, "@astrojs/react");
__astro_tag_component__(SaleOffCategoriesSection, "@astrojs/react");
__astro_tag_component__(ProductRavingSection, "@astrojs/react");

const Promotion = () => {
  const [ref, inView] = useInView();
  const [promotion, setPromotion] = useState(null);
  const fetchData = async () => {
    const data = await getPromotion();
    setPromotion(data);
  };
  useEffect(() => {
    if (inView) {
      !promotion && fetchData();
    }
  }, [inView]);
  return /* @__PURE__ */ jsxs("div", {
    className: "home-promotion",
    ref,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "div-rich-text-wrapper",
      children: [/* @__PURE__ */ jsx(motion.h1, {
        initial: {
          opacity: 0
        },
        whileInView: {
          opacity: 1
        },
        viewport: {
          once: true
        },
        transition: {
          duration: 0.5,
          delay: 0.2
        },
        className: "heading-leisur-e-l",
        children: "Promotion for Member"
      }), /* @__PURE__ */ jsxs(motion.p, {
        className: "text-wrapper",
        initial: {
          opacity: 0,
          y: 10
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5,
          delay: 0.05
        },
        children: ["Sign up now and get ", /* @__PURE__ */ jsx("strong", {
          children: "₱50"
        }), " coupon"]
      }), /* @__PURE__ */ jsx(motion.a, {
        href: promotion?.path,
        className: "link-button",
        initial: {
          opacity: 0,
          y: 10
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5,
          delay: 0.15
        },
        children: /* @__PURE__ */ jsx("span", {
          children: "join rewards"
        })
      })]
    }), promotion && /* @__PURE__ */ jsx(motion.div, {
      className: "home-promotion-img",
      initial: {
        opacity: 0,
        x: -30
      },
      whileInView: {
        opacity: 1,
        x: 0
      },
      viewport: {
        once: true
      },
      transition: {
        duration: 0.5,
        delay: 0.2
      },
      children: /* @__PURE__ */ jsx(Image, {
        src: promotion.url,
        alt: "Promotion for member",
        ariaLabel: "Promotion for member"
      })
    })]
  });
};
__astro_tag_component__(Promotion, "@astrojs/react");

const Community = () => {
  const [ref, inView] = useInView();
  const [communities, setCommunities] = useState(null);
  const fetchData = async () => {
    const data = await getCommunities();
    setCommunities(data);
  };
  useEffect(() => {
    if (inView) {
      !communities && fetchData();
    }
  }, [inView]);
  return /* @__PURE__ */ jsxs("div", {
    className: "home-community",
    ref,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "home-community-header",
      children: [/* @__PURE__ */ jsx(motion.div, {
        className: "home-community-join",
        initial: {
          opacity: 0,
          translateX: 30
        },
        whileInView: {
          opacity: 1,
          translateX: 0
        },
        viewport: {
          once: true
        },
        transition: {
          duration: 0.5,
          delay: 0.2
        },
        children: /* @__PURE__ */ jsx("h2", {
          children: "join the community"
        })
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "home-community-social",
        initial: {
          opacity: 0,
          translateX: -30
        },
        whileInView: {
          opacity: 1,
          translateX: 0
        },
        viewport: {
          once: true
        },
        transition: {
          duration: 0.5,
          delay: 0.2
        },
        children: [/* @__PURE__ */ jsx("button", {
          className: "home-community-ista",
          children: /* @__PURE__ */ jsx(Image, {
            ariaLabel: "Instagram-Icon",
            src: "/assets/icons/Instagram-4.svg",
            alt: "Instagram"
          })
        }), /* @__PURE__ */ jsx("button", {
          className: "home-community-tiktok",
          children: /* @__PURE__ */ jsx(Image, {
            ariaLabel: "Tiktok-Icon",
            className: "home-community-tiktok-img",
            src: "/assets/icons/tiktok-1.svg",
            alt: "Tiktok"
          })
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "home-community-images",
      children: /* @__PURE__ */ jsx("div", {
        className: "home-community-wrapper",
        children: communities && communities.length !== 0 && communities.map((url, index) => /* @__PURE__ */ jsx(motion.div, {
          className: "home-community-img",
          initial: {
            opacity: 0,
            translateY: 30
          },
          whileInView: {
            opacity: 1,
            translateY: 0
          },
          viewport: {
            once: true
          },
          transition: {
            duration: 0.4,
            delay: 0.1 * (index + 1)
          },
          children: /* @__PURE__ */ jsx(Image, {
            src: url,
            alt: "home_community",
            ariaLabel: "home_community"
          })
        }, "home_community_" + index))
      })
    })]
  });
};
__astro_tag_component__(Community, "@astrojs/react");

const Advertising = () => {
  const [ref, inView] = useInView();
  const [advertises, setAdvertises] = useState(null);
  const fetchData = async () => {
    const data = await getAdvertises();
    setAdvertises(data);
  };
  useEffect(() => {
    if (inView) {
      !advertises && fetchData();
    }
  }, [inView]);
  return /* @__PURE__ */ jsx("div", {
    className: "home-advertising",
    ref,
    children: advertises && advertises.length !== 0 && advertises.map((item, idx) => {
      return /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0
        },
        whileInView: {
          opacity: 1
        },
        viewport: {
          once: true
        },
        transition: {
          duration: 0.5,
          delay: 0.2
        },
        className: "home-advertising-image",
        children: [/* @__PURE__ */ jsx(Image, {
          src: item.url,
          alt: "Advertising",
          ariaLabel: "Advertising"
        }), /* @__PURE__ */ jsx("p", {
          className: "home-advertising-text",
          children: "no slip, no sweat."
        }), /* @__PURE__ */ jsx("button", {
          children: /* @__PURE__ */ jsx("a", {
            href: "/collections" + item.path,
            children: item.name
          })
        })]
      }, "home_advertising_" + idx);
    })
  });
};
__astro_tag_component__(Advertising, "@astrojs/react");

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flexfy - Home", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Banner", Banner, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Banner", "client:component-export": "Banner", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "BestSellerSection", BestSellerSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Product", "client:component-export": "BestSellerSection", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "SaleOffProductsSection", SaleOffProductsSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Product", "client:component-export": "SaleOffProductsSection", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "SaleOffCategoriesSection", SaleOffCategoriesSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Product", "client:component-export": "SaleOffCategoriesSection", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "Advertising", Advertising, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Advertising", "client:component-export": "Advertising", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "ProductRavingSection", ProductRavingSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Product", "client:component-export": "ProductRavingSection", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "Promotion", Promotion, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Promotion", "client:component-export": "Promotion", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "Community", Community, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Community", "client:component-export": "Community", "class": "astro-J7PV25F6" })}${renderComponent($$result2, "Confidence", Confidence, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/home/Confidence", "client:component-export": "Confidence", "class": "astro-J7PV25F6" })}` })}`;
}, "D:/src/src/pages/index.astro", void 0);

const $$file = "D:/src/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Carousel as C, index as i };
