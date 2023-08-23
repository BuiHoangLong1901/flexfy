import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.f0afcaf5.mjs';
import { I as Image, l as getProductsByHome, $ as $$Layout } from './_...any_.astro.8e7e2770.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useAnimation, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { C as Carousel } from './index.astro.35475bda.mjs';
import { C as CardProduct } from './_slug_.astro.aa20541a.mjs';
import 'cookie';
import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'node:fs';
import 'node:http';
import 'node:tls';
import 'mime';
import 'html-escaper';
import 'string-width';
import 'zustand';
import 'zustand/middleware';
/* empty css                              */import 'popmotion';
/* empty css                           */
const ThanksBanner = "/_astro/thank-you-banner.a16bbc11.png";

const OrderContent = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "content",
    children: /* @__PURE__ */ jsxs("div", {
      className: "order-thankyou",
      children: [/* @__PURE__ */ jsx(Image, {
        src: ThanksBanner,
        alt: "order-thank-banner",
        className: "order-thank-banner",
        ariaLabel: "order_thankbanner"
      }), /* @__PURE__ */ jsx("h2", {
        className: "order-thanks-text",
        children: "Thank you for your order!"
      }), /* @__PURE__ */ jsxs("div", {
        className: "order-information",
        children: [/* @__PURE__ */ jsx("div", {
          className: "order-code",
          children: /* @__PURE__ */ jsx("h2", {
            children: "Order number is: 30902143"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "order-confirm",
          children: [/* @__PURE__ */ jsx("h2", {
            children: "You will receive an email confirmation shortly from"
          }), " ", /* @__PURE__ */ jsx("a", {
            href: "#",
            children: "infor@flexfy.co"
          })]
        }), /* @__PURE__ */ jsx("h2", {
          className: "print-receipt",
          children: "Print receipt"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "join-community",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "title",
          children: "JOIN OUR COMMUNITY"
        }), /* @__PURE__ */ jsxs("div", {
          className: "media-social",
          children: [/* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/Facebook.svg",
            alt: "facebook",
            className: "facebook",
            ariaLabel: "facebook"
          }), /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/Instagram.svg",
            alt: "instargram",
            className: "instargram",
            ariaLabel: "instargram"
          }), /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/tiktok.svg",
            alt: "tiktok",
            className: "tiktok",
            ariaLabel: "tiktok"
          })]
        })]
      })]
    })
  });
};
__astro_tag_component__(OrderContent, "@astrojs/react");

const boxVariant = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8
    }
  },
  hidden: {
    opacity: 0,
    y: 40
  }
};
const images = ["https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw5WC1zSVFoMWVXNHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1674954273616-295ed56ff0e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60"];
const ImageSlider = () => {
  return images.map((image, idx) => /* @__PURE__ */ jsx("div", {
    className: "banner-img",
    children: /* @__PURE__ */ jsx(Image, {
      src: image,
      alt: "slider_01",
      ariaLabel: "slider_01"
    })
  }, "slider_" + idx));
};
const Wardrobe = () => {
  const control = useAnimation();
  const [products, setProducts] = useState();
  const [ref, inView] = useInView();
  const fetchData = async () => {
    const data = await getProductsByHome("/home/best-sellers");
    setProducts(data?.splice(0, 3));
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      (!products || products.length == 0) && fetchData();
    }
  }, [control, inView]);
  return /* @__PURE__ */ jsxs("div", {
    className: "wardrobe",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "wardrobe-title",
      children: "COMPLETE YOUR WARDROBE WITH THESE"
    }), /* @__PURE__ */ jsx(motion.div, {
      className: "product-list",
      ref,
      variants: boxVariant,
      initial: "hidden",
      animate: control,
      children: products?.map((product, index) => {
        return /* @__PURE__ */ jsx(CardProduct, {
          product,
          className: "product-wardrobe",
          extraComponent: /* @__PURE__ */ jsx("button", {
            className: "btn",
            children: /* @__PURE__ */ jsx("span", {
              children: "choose your size"
            })
          })
        }, "best_sellers_" + product.name + `_${index}`);
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "product-footer",
      children: [/* @__PURE__ */ jsx("div", {
        className: "title-box",
        children: /* @__PURE__ */ jsx("h2", {
          className: "title",
          children: "HURRY! THESE DEALS WON'T LAST FOREVER!"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "carousel",
        children: /* @__PURE__ */ jsxs("div", {
          className: "banner",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "banner-information",
            children: [/* @__PURE__ */ jsx("div", {
              className: "banner-logo",
              children: /* @__PURE__ */ jsx(Image, {
                src: "./logo.svg",
                alt: "logo",
                ariaLabel: "logo"
              })
            }), /* @__PURE__ */ jsx("h2", {
              className: "banner-title",
              children: "Summer Sale"
            }), /* @__PURE__ */ jsxs("div", {
              className: "group",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Up to"
              }), /* @__PURE__ */ jsx("span", {
                className: "group-sale-text",
                children: "80%"
              }), /* @__PURE__ */ jsx("span", {
                children: "Off"
              })]
            }), /* @__PURE__ */ jsx("button", {
              className: "shop-now",
              children: /* @__PURE__ */ jsx("span", {
                children: "Shop Now"
              })
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "banner-wrapper",
            children: /* @__PURE__ */ jsx(Carousel, {
              items: ImageSlider(),
              pagination: true
            })
          })]
        })
      })]
    })]
  });
};
__astro_tag_component__(Wardrobe, "@astrojs/react");

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$OrderSuccess = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OrderSuccess;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flexfy - Order Success" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div id="OrderSuccess"><a class="header" href="/">${renderComponent($$result2, "Image", Image, { "src": "/logo.svg", "alt": "header-logo", "className": "header-logo", "ariaLabel": "header-logo" })}</a>${renderComponent($$result2, "OrderContent", OrderContent, {})}${renderComponent($$result2, "Wardrobe", Wardrobe, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/order-success/Wardrobe", "client:component-export": "Wardrobe" })}</div>` })}`;
}, "D:/src/src/pages/order-success.astro");

const $$file = "D:/src/src/pages/order-success.astro";
const $$url = "/order-success";

export { $$OrderSuccess as default, $$file as file, $$url as url };
