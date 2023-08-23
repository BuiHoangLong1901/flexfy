import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, s as spreadAttributes, u as unescapeHTML, d as renderComponent, m as maybeRenderHead, e as renderSlot, f as renderHead } from '../astro.f0afcaf5.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
/* empty css                              */
const BACKEND_ENDPOINT = "https://be-flexfy.nani.digital/landing";
async function getMenu() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/menu");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getFooter() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/footer");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getBanners() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/banner");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getPromotion() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/promotion");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getCommunities() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/community");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getAdvertises() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/advertising");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getProductsByHome(url) {
  try {
    const response = await fetch(BACKEND_ENDPOINT + url);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getCategoryBySlug(slug) {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/categories/" + slug);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getColors() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/product-option/color");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getSizes() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/product-option/size");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getListProducts(query) {
  try {
    const searchParams = "?" + new URLSearchParams(query).toString();
    const response = await fetch(
      BACKEND_ENDPOINT + "/product/find" + searchParams
    );
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getReviewByProduct(slug) {
  try {
    const response = await fetch(
      BACKEND_ENDPOINT + "/product/feedback/" + slug
    );
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getRatingList(slug) {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/review/product/" + slug);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getQuestionList(slug) {
  try {
    const response = await fetch(
      BACKEND_ENDPOINT + "/question/product/" + slug
    );
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getAllCountries() {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/country");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

const Image = (props) => {
  const {
    ariaLabel,
    ...other
  } = props;
  return /* @__PURE__ */ jsx("img", {
    ...other,
    "aria-label": ariaLabel
  });
};
const ImageAnimation = (props) => {
  const {
    ariaLabel,
    loading = "lazy",
    ...other
  } = props;
  return /* @__PURE__ */ jsx(motion.img, {
    ...other,
    "aria-label": ariaLabel,
    loading
  });
};
__astro_tag_component__(Image, "@astrojs/react");
__astro_tag_component__(ImageAnimation, "@astrojs/react");

function updateCartItems(item, get, set, isNew) {
  const { cart } = get();
  const existingCartItem = cart.items.find(
    (cartItem) => cartItem.key === item.key
  );
  if (existingCartItem) {
    const newQuantity = isNew ? item.quantity : item.quantity - existingCartItem.quantity;
    existingCartItem.quantity += newQuantity;
    if (existingCartItem.quantity === 0) {
      cart.items = cart.items.filter((cartItem) => cartItem.key !== item.key);
    }
  } else if (item.quantity > 0) {
    cart.items.unshift({ ...item });
  }
  cart.totalPrice = cart.items.reduce(
    (total, item2) => total + item2.price * item2.quantity,
    0
  );
  set({ cart: { ...cart } });
}
const useCartStore = create()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        totalPrice: 0
      },
      showModal: (isShow) => set({
        isShowModal: isShow
      }),
      onAddToCart: (product, quantity, option) => {
        const key = `${product.id}-${option.size}-${option.color}`;
        const item = {
          key,
          name: product.name,
          thumbnail: product.thumbnail,
          price: product.price,
          slug: product.slug,
          originalPrice: product.originalPrice,
          option,
          quantity
        };
        updateCartItems(item, get, set, true);
      },
      onRemoveToCart: (item) => {
        updateCartItems({ ...item, quantity: 0 }, get, set);
      },
      onUpdateQuantity: (item) => {
        updateCartItems(item, get, set);
      }
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: { ...state.cart }
      })
    }
  )
);

const StarIcon = (props) => {
  const {
    width = 20,
    height = 20,
    fill,
    stroke
  } = props;
  return /* @__PURE__ */ jsxs("svg", {
    width,
    height,
    viewBox: "0 0 8 9",
    fill,
    xmlns: "http://www.w3.org/2000/svg",
    children: [/* @__PURE__ */ jsx("g", {
      clipPath: "url(#a)",
      children: /* @__PURE__ */ jsx("path", {
        d: "m5.857 5.409 1.55-1.426-2.11-.257a.38.38 0 0 1-.294-.211L4.1 1.612l-.904 1.901v.001a.377.377 0 0 1-.295.21l-2.108.258 1.55 1.425a.369.369 0 0 1 .116.348l-.404 2.056L3.92 6.796h.001a.383.383 0 0 1 .36 0h.002l1.864 1.016-.404-2.056a.373.373 0 0 1 .114-.347Zm0 0Z",
        stroke,
        strokeWidth: "0.417"
      })
    }), /* @__PURE__ */ jsx("defs", {
      children: /* @__PURE__ */ jsx("clipPath", {
        id: "a",
        children: /* @__PURE__ */ jsx("path", {
          fill: "#fff",
          d: "M.556.95h7.09v7.533H.556z"
        })
      })
    })]
  });
};
const Logo = () => {
  return /* @__PURE__ */ jsxs("svg", {
    width: "65",
    height: "26",
    viewBox: "0 0 65 26",
    fill: "none",
    className: "logo",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/* @__PURE__ */ jsxs("g", {
      id: "Layer_1",
      clipPath: "url(#clip0_151_3976)",
      children: [/* @__PURE__ */ jsx("path", {
        id: "Vector",
        d: "M64.8576 5.51491C64.2247 6.57179 63.6809 7.79308 63.2273 9.1776C62.7737 10.5621 62.3201 11.9842 61.8666 13.4427C61.413 14.9012 60.9219 16.328 60.3945 17.7231C59.8671 19.1182 59.2072 20.3712 58.4173 21.4809C57.6262 22.5906 56.6604 23.4831 55.5212 24.1595C54.382 24.8359 52.979 25.1741 51.3124 25.1741H50.7745V22.4157C51.7449 22.4157 52.5571 22.3311 53.2111 22.162C53.8651 21.9929 54.4242 21.7451 54.8883 21.4187C55.3524 21.0922 55.7533 20.6965 56.0908 20.2326C56.4283 19.7687 56.7659 19.2297 57.1034 18.6179L50.458 5.51491H52.2665C53.0025 5.51491 53.6764 5.92709 54.0128 6.58236L58.5603 15.439C58.8134 14.6358 59.0502 13.8326 59.2729 13.0294C59.4944 12.2261 59.7417 11.4182 60.0171 10.6032C60.2914 9.78942 60.5973 8.95917 60.9348 8.11367C61.1516 7.56996 61.4001 7.01686 61.6779 6.45436C61.9556 5.89186 62.551 5.51373 63.1933 5.51373H64.8588L64.8576 5.51491Z",
        fill: "#FFB4B4"
      }), /* @__PURE__ */ jsx("path", {
        id: "Vector_2",
        d: "M26.5049 18.9726V18.8375L30.8707 11.8163L27.0651 5.64762V5.51257H28.1141C28.9919 5.51257 29.8053 5.9729 30.2577 6.72681L32.3041 10.1335H32.7073L34.7115 6.74208C35.1615 5.97995 35.9796 5.51257 36.8633 5.51257H37.7658V5.64762L34.0047 11.7717L38.3705 18.8375V18.9726H37.2067C36.3183 18.9726 35.4979 18.5005 35.049 17.7337L32.5725 13.5003H32.1693L29.6928 17.7337C29.2439 18.5017 28.4223 18.9726 27.5351 18.9726H26.5061H26.5049Z",
        fill: "#FFB4B4"
      }), /* @__PURE__ */ jsxs("g", {
        id: "Group",
        children: [/* @__PURE__ */ jsx("path", {
          id: "Vector_3",
          d: "M2.47366 23.2471C2.58969 23.0475 2.74908 22.8925 2.94833 22.7797C3.14758 22.6682 3.36675 22.6118 3.60584 22.6118C3.87775 22.6118 4.12036 22.6788 4.33367 22.8138C4.54581 22.9488 4.70052 23.1379 4.79662 23.3845H4.29148C4.22467 23.2483 4.13325 23.1473 4.01488 23.0804C3.89768 23.0134 3.76055 22.9806 3.60584 22.9806C3.4359 22.9806 3.2847 23.0193 3.15344 23.0945C3.01982 23.1708 2.91786 23.28 2.84285 23.4233C2.76784 23.5665 2.73033 23.7333 2.73033 23.9224C2.73033 24.1114 2.76784 24.2782 2.84285 24.4214C2.91786 24.5647 3.02217 24.6739 3.15344 24.7526C3.28587 24.8301 3.43707 24.8689 3.60584 24.8689C3.76055 24.8689 3.8965 24.836 4.01488 24.769C4.13325 24.7021 4.22467 24.6011 4.29148 24.4661H4.79662C4.70052 24.7127 4.54698 24.9017 4.33367 25.0344C4.12153 25.1671 3.87892 25.2341 3.60584 25.2341C3.3644 25.2341 3.14523 25.1777 2.94599 25.0661C2.74674 24.9546 2.58852 24.7972 2.47248 24.5988C2.35645 24.3991 2.29785 24.1737 2.29785 23.9224C2.29902 23.671 2.35763 23.4444 2.47366 23.2459V23.2471Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_4",
          d: "M5.64753 25.1166C5.49282 25.0285 5.37093 24.9064 5.28303 24.7467C5.19512 24.587 5.14941 24.4038 5.14941 24.1936C5.14941 23.9834 5.19512 23.8037 5.28654 23.6428C5.37679 23.4819 5.50102 23.3598 5.65808 23.2729C5.81513 23.1872 5.99093 23.1437 6.18432 23.1437C6.3777 23.1437 6.55351 23.186 6.71056 23.2729C6.86761 23.3586 6.99185 23.4819 7.0821 23.6428C7.17234 23.8037 7.21922 23.9869 7.21922 24.1936C7.21922 24.4003 7.17234 24.5834 7.07858 24.7443C6.98482 24.9052 6.85824 25.0285 6.69767 25.1166C6.5371 25.2047 6.36012 25.2481 6.16439 25.2481C5.96866 25.2481 5.80106 25.2047 5.64636 25.1166H5.64753ZM6.47147 24.8042C6.5664 24.7514 6.64258 24.675 6.70119 24.5705C6.76096 24.466 6.78909 24.3404 6.78909 24.1936C6.78909 24.0468 6.76096 23.92 6.7047 23.8178C6.64727 23.7156 6.57343 23.6381 6.47967 23.5865C6.38591 23.5336 6.28629 23.5089 6.17846 23.5089C6.07063 23.5089 5.96984 23.5348 5.87842 23.5865C5.78583 23.6381 5.71433 23.7156 5.65925 23.8178C5.60416 23.92 5.57838 24.0456 5.57838 24.1936C5.57838 24.412 5.63464 24.5823 5.74598 24.7021C5.85732 24.8207 5.99797 24.8805 6.16674 24.8805C6.27574 24.8805 6.3777 24.8547 6.47147 24.8042Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_5",
          d: "M9.08955 23.2436C9.21496 23.3105 9.31458 23.4091 9.38607 23.5383C9.45757 23.6698 9.49273 23.826 9.49273 24.0116V25.2141H9.07666V24.075C9.07666 23.893 9.03095 23.7532 8.93953 23.6557C8.84928 23.5583 8.72505 23.5101 8.568 23.5101C8.41094 23.5101 8.28554 23.5583 8.19412 23.6557C8.10153 23.7532 8.05582 23.893 8.05582 24.075V25.2141H7.63623V23.1766H8.05582V23.4103C8.12497 23.3269 8.2117 23.2612 8.31835 23.2142C8.42501 23.1672 8.5387 23.1437 8.65824 23.1437C8.81881 23.1437 8.9618 23.1766 9.08955 23.2436Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_6",
          d: "M10.8785 23.5207H10.5034V25.2141H10.0791V23.5207H9.83887V23.1766H10.0791V23.0322C10.0791 22.7973 10.1413 22.6271 10.2655 22.5202C10.3886 22.4133 10.5843 22.3593 10.8492 22.3593V22.7104C10.7214 22.7104 10.6323 22.7351 10.5808 22.7821C10.5292 22.8302 10.5034 22.9136 10.5034 23.031V23.1755H10.8785V23.5195V23.5207Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_7",
          d: "M11.2707 22.8291C11.2191 22.7774 11.1934 22.714 11.1934 22.6376C11.1934 22.5613 11.2191 22.4967 11.2707 22.4451C11.3223 22.3922 11.3856 22.3676 11.4618 22.3676C11.5379 22.3676 11.5989 22.3934 11.6493 22.4451C11.7008 22.4967 11.7266 22.5601 11.7266 22.6376C11.7266 22.7152 11.7008 22.7786 11.6493 22.8291C11.5977 22.8807 11.5356 22.9066 11.4618 22.9066C11.3879 22.9066 11.3223 22.8807 11.2707 22.8291ZM11.6692 23.1767V25.2141H11.2496V23.1767H11.6692Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_8",
          d: "M12.2083 23.6428C12.2927 23.4843 12.4076 23.3622 12.5541 23.2741C12.7006 23.186 12.8623 23.1426 13.0416 23.1426C13.1741 23.1426 13.3042 23.1719 13.4343 23.2295C13.5644 23.2882 13.6652 23.3645 13.7413 23.4608V22.4779H14.1656V25.2141H13.7413V24.9076C13.6722 25.0062 13.5784 25.0872 13.4554 25.1518C13.3346 25.2164 13.1952 25.2481 13.0381 25.2481C12.8611 25.2481 12.7006 25.2035 12.5541 25.1131C12.4076 25.0226 12.2927 24.8982 12.2083 24.7361C12.1239 24.5741 12.0806 24.392 12.0806 24.1865C12.0806 23.981 12.1228 23.8002 12.2083 23.6428ZM13.6569 23.8272C13.5983 23.7239 13.5233 23.6452 13.4307 23.59C13.3382 23.5348 13.2374 23.509 13.1295 23.509C13.0217 23.509 12.9209 23.536 12.8283 23.5876C12.7357 23.6417 12.6596 23.718 12.6021 23.8213C12.5435 23.9247 12.5166 24.0444 12.5166 24.1854C12.5166 24.3263 12.5459 24.4496 12.6021 24.5553C12.6607 24.661 12.7369 24.742 12.8307 24.7972C12.9256 24.8535 13.0252 24.8794 13.1307 24.8794C13.2362 24.8794 13.3393 24.8524 13.4319 24.7984C13.5257 24.7432 13.6007 24.6645 13.6581 24.56C13.7167 24.4555 13.7437 24.3321 13.7437 24.1912C13.7437 24.0515 13.7132 23.9294 13.6569 23.8272Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_9",
          d: "M16.5636 24.3533H15.0142C15.0259 24.5165 15.0869 24.6457 15.1947 24.7444C15.3025 24.843 15.4362 24.8923 15.5932 24.8923C15.8194 24.8923 15.9776 24.7972 16.0714 24.6081H16.5238C16.4617 24.7949 16.3515 24.9487 16.1909 25.0685C16.0304 25.1871 15.83 25.247 15.5932 25.247C15.3998 25.247 15.2252 25.2035 15.0728 25.1154C14.9193 25.0274 14.7997 24.9052 14.7118 24.7455C14.6251 24.5858 14.5806 24.4026 14.5806 24.1924C14.5806 23.9822 14.6228 23.799 14.7083 23.6393C14.7927 23.4796 14.9111 23.3575 15.0658 23.2706C15.2193 23.1837 15.3951 23.1414 15.5955 23.1414C15.796 23.1414 15.9577 23.1825 16.1077 23.2671C16.2577 23.3504 16.3738 23.4691 16.457 23.6205C16.5402 23.772 16.5824 23.9458 16.5824 24.1431C16.5789 24.2194 16.5742 24.2887 16.5648 24.351L16.5636 24.3533ZM16.1394 24.0128C16.137 23.8578 16.0808 23.7333 15.9741 23.6393C15.8663 23.5454 15.7315 23.4984 15.5721 23.4984C15.4268 23.4984 15.3037 23.5442 15.2006 23.637C15.0974 23.7298 15.0365 23.8542 15.0166 24.0128H16.1405H16.1394Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_10",
          d: "M18.4438 23.2436C18.5693 23.3105 18.6689 23.4091 18.7404 23.5383C18.8119 23.6687 18.847 23.826 18.847 24.0116V25.2141H18.431V24.075C18.431 23.893 18.3852 23.7532 18.295 23.6557C18.2036 23.5583 18.0793 23.5101 17.9235 23.5101C17.7676 23.5101 17.641 23.5583 17.5496 23.6557C17.457 23.7532 17.4113 23.893 17.4113 24.075V25.2141H16.9917V23.1766H17.4113V23.4103C17.4804 23.3269 17.5672 23.2612 17.6738 23.2142C17.7805 23.1684 17.8942 23.1437 18.0137 23.1437C18.1743 23.1437 18.3173 23.1766 18.4438 23.2436Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_11",
          d: "M19.3697 23.6416C19.4541 23.4819 19.5725 23.3598 19.7225 23.2729C19.8725 23.186 20.0448 23.1437 20.2382 23.1437C20.4843 23.1437 20.6871 23.2025 20.8477 23.3199C21.0082 23.4361 21.1172 23.6041 21.1735 23.8201H20.7211C20.6848 23.7192 20.625 23.6405 20.5441 23.5829C20.4633 23.5254 20.3613 23.4984 20.2394 23.4984C20.0671 23.4984 19.9311 23.5594 19.8292 23.6816C19.7272 23.8049 19.6768 23.974 19.6768 24.1936C19.6768 24.4132 19.7272 24.5834 19.8292 24.7079C19.9311 24.8312 20.0671 24.8923 20.2394 24.8923C20.4832 24.8923 20.6437 24.7854 20.7223 24.5705H21.1747C21.1149 24.7772 21.0047 24.9428 20.843 25.0637C20.6812 25.1859 20.4797 25.2469 20.2382 25.2469C20.0448 25.2469 19.8725 25.2035 19.7225 25.1154C19.5725 25.0273 19.4553 24.9052 19.3697 24.7455C19.2854 24.5858 19.2432 24.4026 19.2432 24.1924C19.2432 23.9822 19.2854 23.799 19.3697 23.6393V23.6416Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_12",
          d: "M23.4379 24.3533H21.8873C21.899 24.5165 21.9599 24.6457 22.0678 24.7444C22.1756 24.843 22.3092 24.8923 22.4662 24.8923C22.6925 24.8923 22.8507 24.7972 22.9444 24.6081H23.3968C23.3347 24.7949 23.2234 24.9487 23.064 25.0685C22.9034 25.1871 22.703 25.247 22.4662 25.247C22.2729 25.247 22.0982 25.2035 21.9459 25.1154C21.7923 25.0274 21.6728 24.9052 21.5849 24.7455C21.4982 24.5858 21.4536 24.4026 21.4536 24.1924C21.4536 23.9822 21.4958 23.799 21.5802 23.6393C21.6646 23.4796 21.7841 23.3575 21.9377 23.2706C22.0912 23.1837 22.267 23.1414 22.4662 23.1414C22.6655 23.1414 22.8284 23.1825 22.9784 23.2671C23.1284 23.3504 23.2445 23.4691 23.3289 23.6205C23.4121 23.772 23.4531 23.9458 23.4531 24.1431C23.4531 24.2194 23.4472 24.2887 23.4379 24.351V24.3533ZM23.0136 24.0128C23.0112 23.8578 22.955 23.7333 22.8472 23.6393C22.7393 23.5454 22.6045 23.4984 22.4452 23.4984C22.2998 23.4984 22.1768 23.5442 22.0736 23.637C21.9705 23.7298 21.9095 23.8542 21.8896 24.0128H23.0136Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_13",
          d: "M25.6729 23.5207H25.2978V25.2141H24.8736V23.5207H24.6333V23.1766H24.8736V23.0322C24.8736 22.7973 24.9357 22.6271 25.0599 22.5202C25.183 22.4133 25.3787 22.3593 25.6436 22.3593V22.7104C25.5158 22.7104 25.4268 22.7351 25.3752 22.7821C25.3236 22.8302 25.2978 22.9136 25.2978 23.031V23.1755H25.6729V23.5195V23.5207Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_14",
          d: "M26.709 23.2307C26.8109 23.172 26.9317 23.145 27.0723 23.145V23.5806H26.9657C26.8016 23.5806 26.6762 23.6217 26.5918 23.7063C26.5074 23.7897 26.464 23.9364 26.464 24.1431V25.2153H26.0444V23.1778H26.464V23.4738C26.5261 23.3704 26.607 23.2906 26.709 23.2319V23.2307Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_15",
          d: "M27.8189 25.1166C27.6642 25.0285 27.5423 24.9064 27.4544 24.7467C27.3665 24.587 27.3208 24.4038 27.3208 24.1936C27.3208 23.9834 27.3665 23.8037 27.4579 23.6428C27.5493 23.4819 27.6724 23.3598 27.8295 23.2729C27.9865 23.1872 28.1623 23.1437 28.3557 23.1437C28.5491 23.1437 28.7249 23.186 28.8819 23.2729C29.039 23.3586 29.1632 23.4819 29.2535 23.6428C29.3437 23.8037 29.3894 23.9869 29.3894 24.1936C29.3894 24.4003 29.3437 24.5834 29.2488 24.7443C29.1539 24.9052 29.0285 25.0285 28.8679 25.1166C28.7073 25.2047 28.5303 25.2481 28.3346 25.2481C28.1389 25.2481 27.9725 25.2047 27.8177 25.1166H27.8189ZM28.6429 24.8042C28.7378 24.7514 28.814 24.675 28.8726 24.5705C28.9323 24.4672 28.9605 24.3404 28.9605 24.1936C28.9605 24.0468 28.9323 23.92 28.8761 23.8178C28.8187 23.7156 28.7436 23.6381 28.6511 23.5865C28.5585 23.5336 28.4577 23.5089 28.3487 23.5089C28.2397 23.5089 28.1401 23.5348 28.0486 23.5865C27.956 23.6381 27.8845 23.7156 27.8295 23.8178C27.7756 23.92 27.7486 24.0456 27.7486 24.1936C27.7486 24.412 27.8049 24.5823 27.9162 24.7021C28.0275 24.8207 28.1682 24.8805 28.3381 24.8805C28.4495 24.8805 28.5503 24.8547 28.644 24.8042H28.6429Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_16",
          d: "M32.6935 23.2436C32.8189 23.3105 32.9197 23.4092 32.9912 23.5395C33.0638 23.6711 33.1001 23.8272 33.1001 24.0128V25.2153H32.6841V24.0762C32.6841 23.8942 32.6384 23.7544 32.5481 23.657C32.4579 23.5595 32.3325 23.5113 32.1766 23.5113C32.0207 23.5113 31.8941 23.5595 31.8027 23.657C31.7101 23.7544 31.6644 23.8942 31.6644 24.0762V25.2153H31.2483V24.0762C31.2483 23.8942 31.2026 23.7544 31.1124 23.657C31.021 23.5595 30.8967 23.5113 30.7408 23.5113C30.585 23.5113 30.4584 23.5595 30.367 23.657C30.2744 23.7544 30.2287 23.8942 30.2287 24.0762V25.2153H29.8091V23.1778H30.2287V23.4115C30.2978 23.3282 30.3845 23.2624 30.49 23.2154C30.5955 23.1696 30.708 23.145 30.8287 23.145C30.9905 23.145 31.1346 23.179 31.2636 23.2483C31.3913 23.3176 31.4898 23.4174 31.5578 23.5477C31.6199 23.4244 31.7148 23.327 31.8449 23.2542C31.9762 23.1814 32.1145 23.145 32.2645 23.145C32.4239 23.1461 32.5669 23.179 32.6935 23.2459V23.2436Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_17",
          d: "M37.9266 22.6447L37.1672 25.2141H36.6925L36.1545 23.2694L35.5826 25.2141L35.1114 25.2176L34.3848 22.6447H34.8301L35.3599 24.7373L35.9354 22.6447H36.4065L36.941 24.7267L37.4754 22.6447H37.9255H37.9266Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_18",
          d: "M38.2946 22.8291C38.2431 22.7774 38.2173 22.714 38.2173 22.6376C38.2173 22.5613 38.2431 22.4967 38.2946 22.4451C38.3462 22.3922 38.4095 22.3676 38.4857 22.3676C38.5619 22.3676 38.6216 22.3934 38.6732 22.4451C38.7248 22.4967 38.7506 22.5601 38.7506 22.6376C38.7506 22.7152 38.7248 22.7786 38.6732 22.8291C38.6216 22.8807 38.5595 22.9066 38.4857 22.9066C38.4118 22.9066 38.345 22.8807 38.2946 22.8291ZM38.692 23.1767V25.2141H38.2724V23.1767H38.692Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_19",
          d: "M39.7349 23.5207V24.648C39.7349 24.7244 39.7524 24.7796 39.7876 24.8124C39.8228 24.8453 39.8849 24.8618 39.9704 24.8618H40.2283V25.2129H39.8966C39.7079 25.2129 39.5626 25.1683 39.4618 25.0802C39.361 24.9909 39.3106 24.8465 39.3106 24.648V23.5207H39.0703V23.1766H39.3106V22.6693H39.7349V23.1766H40.2283V23.5207H39.7349Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_20",
          d: "M42.0791 23.2436C42.1998 23.3105 42.2959 23.4091 42.3663 23.5383C42.4366 23.6687 42.4717 23.826 42.4717 24.0116V25.2141H42.0557V24.075C42.0557 23.893 42.01 23.7532 41.9185 23.6557C41.8271 23.5583 41.7041 23.5101 41.547 23.5101C41.3899 23.5101 41.2645 23.5583 41.1731 23.6557C41.0805 23.7532 41.0348 23.893 41.0348 24.075V25.2141H40.6152V22.4779H41.0348V23.4138C41.1063 23.3281 41.1954 23.2612 41.3056 23.2142C41.4157 23.1684 41.5341 23.1437 41.6654 23.1437C41.8201 23.1437 41.9584 23.1766 42.0791 23.2436Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_21",
          d: "M43.0285 22.8291C42.977 22.7774 42.9512 22.714 42.9512 22.6376C42.9512 22.5613 42.977 22.4967 43.0285 22.4451C43.0801 22.3922 43.1434 22.3676 43.2196 22.3676C43.2958 22.3676 43.3567 22.3934 43.4071 22.4451C43.4587 22.4967 43.4844 22.5601 43.4844 22.6376C43.4844 22.7152 43.4587 22.7786 43.4071 22.8291C43.3555 22.8807 43.2934 22.9066 43.2196 22.9066C43.1457 22.9066 43.0789 22.8807 43.0285 22.8291ZM43.4258 23.1767V25.2141H43.0063V23.1767H43.4258Z",
          fill: "#FFB4B4"
        }), /* @__PURE__ */ jsx("path", {
          id: "Vector_22",
          d: "M45.4309 23.2436C45.5563 23.3105 45.6559 23.4091 45.7274 23.5383C45.7989 23.6698 45.834 23.826 45.834 24.0116V25.2141H45.418V24.075C45.418 23.893 45.3723 23.7532 45.2808 23.6557C45.1906 23.5583 45.0664 23.5101 44.9093 23.5101C44.7523 23.5101 44.6268 23.5583 44.5354 23.6557C44.4428 23.7532 44.3971 23.893 44.3971 24.075V25.2141H43.9775V23.1766H44.3971V23.4103C44.4663 23.3269 44.553 23.2612 44.6608 23.2142C44.7675 23.1684 44.8812 23.1437 45.0007 23.1437C45.1601 23.1437 45.3031 23.1766 45.4309 23.2436Z",
          fill: "#FFB4B4"
        })]
      }), /* @__PURE__ */ jsx("path", {
        id: "Vector_23",
        d: "M27.1987 12.2437C27.1987 9.97612 26.6924 8.22757 25.6938 7.0462C24.7093 5.88011 23.2583 5.28943 21.383 5.28943C19.5078 5.28943 17.9045 5.91886 16.8402 7.16246C15.8159 8.35791 15.2744 10.1065 15.2744 12.2202C15.2744 14.334 15.8171 16.1084 16.8438 17.3097C17.915 18.5615 19.4562 19.1968 21.4276 19.1968C25.4289 19.1968 26.642 16.5323 27.0088 14.8213H24.4186C23.9896 16.3562 22.9055 17.2334 21.4288 17.2334C19.38 17.2334 18.1049 15.6892 17.9326 12.9965L17.922 12.8426H27.1987V12.2437ZM17.9384 11.1035L17.9549 10.9438C18.2092 8.52114 19.4187 7.18595 21.3608 7.18595C23.3028 7.18595 24.4034 8.52349 24.5194 10.9508L24.5264 11.1035H17.9384Z",
        fill: "#FFB4B4"
      }), /* @__PURE__ */ jsx("path", {
        id: "Vector_24",
        d: "M14.4131 18.9632H12.2285C11.7784 18.9632 11.3682 18.7165 11.1502 18.322C10.7529 17.6092 10.5841 16.7695 10.5841 15.6187V3.98711L10.447 3.93074C9.69455 3.63481 8.87998 3.47276 8.15332 3.47276C6.50076 3.47276 5.66158 4.16795 5.5854 5.59827L5.57251 5.82843H8.26935V8.28627H5.5854V17.3156C5.5854 18.2245 4.85054 18.9608 3.94338 18.9608C3.88947 18.9678 3.83321 18.9725 3.77695 18.9725H1.58994C2.13845 18.3185 2.54398 17.5458 2.72095 16.3127V8.28627H0.857422V5.82843H2.71275L2.72095 5.61941C2.73385 5.31878 2.76783 5.03812 2.81823 4.7739C3.10772 3.29544 3.98089 2.3642 5.0615 1.84868C5.82801 1.48112 6.69649 1.32141 7.53801 1.32141C8.95734 1.32141 10.038 1.67488 10.4376 1.82637L10.4622 1.83694L13.186 1.84163V14.7849C13.186 16.9692 13.6701 18.0742 14.4143 18.962L14.4131 18.9632Z",
        fill: "#FFB4B4"
      }), /* @__PURE__ */ jsx("path", {
        className: "rectBackground",
        id: "Vector_25",
        d: "M49.1123 5.60768C47.3156 5.56306 45.5552 5.99873 44.0128 6.87712C43.5076 6.03631 43.0002 5.08511 42.5478 4.23843C42.4751 4.10104 42.4024 3.96599 42.3309 3.83447C42.127 3.45516 42.4013 2.99366 42.8314 2.99366L49.2951 2.98779L49.2565 0.248108L41.1894 0.263374C40.3443 0.275117 39.5931 0.721357 39.1758 1.45883C38.7597 2.19395 38.7656 3.06881 39.1899 3.80041C39.4712 4.28423 39.7923 4.88783 40.1416 5.53605C40.6573 6.50251 41.2398 7.58993 41.8352 8.55756C41.2445 9.15881 40.7252 9.83522 40.2834 10.575C38.7469 13.1668 38.4621 16.0697 39.5602 17.9756C40.3244 19.3002 41.664 20.0271 43.3365 20.0271C43.3647 20.0271 43.3928 20.0271 43.4197 20.0248C45.7181 19.9942 46.7507 18.854 47.2136 17.9004C48.4747 15.3122 46.8069 11.3043 45.5177 9.15529C46.5772 8.58222 47.7574 8.31096 49.035 8.34149L49.3139 8.34971L49.3889 5.61003L49.11 5.60416L49.1123 5.60768ZM44.8449 16.6286C44.7582 16.7789 44.4816 17.2745 43.3822 17.2898C42.6579 17.298 42.2219 17.0714 41.9289 16.6087C41.4824 15.9029 41.6418 13.6517 42.6321 11.983C42.7915 11.7153 43.0424 11.3325 43.3916 10.9215C44.3843 12.6994 45.8294 14.9388 44.8461 16.631L44.8449 16.6286Z",
        fill: "#B2A4FF"
      })]
    }), /* @__PURE__ */ jsx("defs", {
      children: /* @__PURE__ */ jsx("clipPath", {
        id: "clip0_151_3976",
        children: /* @__PURE__ */ jsx("rect", {
          width: "64",
          height: "25",
          fill: "white",
          transform: "translate(0.857422 0.248108)"
        })
      })
    })]
  });
};
const CartCount = () => {
  const {
    items
  } = useCartStore((s) => s.cart);
  if (!items.length)
    return /* @__PURE__ */ jsx(Fragment, {});
  return /* @__PURE__ */ jsx("div", {
    className: "cart-count",
    children: /* @__PURE__ */ jsx("div", {
      className: "text-wrapper-2",
      children: items.length
    })
  });
};
__astro_tag_component__(StarIcon, "@astrojs/react");
__astro_tag_component__(Logo, "@astrojs/react");
__astro_tag_component__(CartCount, "@astrojs/react");

const backdrop = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};
const SelectBox = ({
  label,
  defaultValue,
  items,
  className,
  IconEnd,
  name,
  onChange
}) => {
  const getLabelByValue = (value) => {
    const option = items.find((option2) => option2.value === value);
    return option ? option.label : "Unknown";
  };
  const [showDropDown, setShowDropdown] = useState(false);
  const selectBoxRef = useRef(null);
  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
  const handleOutSideClick = (e) => {
    if (selectBoxRef.current && !selectBoxRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChangeSelect = (item) => {
    setSelectedOption(item);
    onChange && onChange(item);
  };
  return /* @__PURE__ */ jsxs("div", {
    ref: selectBoxRef,
    className: `select ${className}`,
    onClick: toggleDropdown,
    children: [label && /* @__PURE__ */ jsx("div", {
      className: "select-label",
      children: /* @__PURE__ */ jsx("span", {
        children: label
      })
    }), /* @__PURE__ */ jsx("input", {
      className: "select-value",
      name,
      readOnly: true,
      value: selectedOption?.label || getLabelByValue(defaultValue)
    }), showDropDown && /* @__PURE__ */ jsx(motion.ul, {
      className: "select-options",
      variants: backdrop,
      initial: "hidden",
      animate: "visible",
      exit: "hidden",
      children: items.length ? items.map((item, idx) => /* @__PURE__ */ jsx("li", {
        onClick: () => handleChangeSelect(item),
        children: /* @__PURE__ */ jsx("div", {
          className: "select-option",
          children: item.label
        })
      }, item.value + idx)) : /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx("div", {
          className: "select-option",
          children: "no options"
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "select-icon-close",
      children: IconEnd ?? /* @__PURE__ */ jsx(Image, {
        src: "/assets/icons/down.svg",
        alt: "arrow-down",
        ariaLabel: "select_arrow-down"
      })
    })]
  });
};
__astro_tag_component__(SelectBox, "@astrojs/react");

const $$Astro$b = createAstro("https://flexfy.meta-book.online");
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "D:/src/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro");

const $$Astro$a = createAstro("https://flexfy.meta-book.online");
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "D:/src/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro");

const $$Astro$9 = createAstro("https://flexfy.meta-book.online");
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "D:/src/node_modules/astro-seo/src/components/OpenGraphImageTags.astro");

const $$Astro$8 = createAstro("https://flexfy.meta-book.online");
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "D:/src/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro");

const $$Astro$7 = createAstro("https://flexfy.meta-book.online");
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "D:/src/node_modules/astro-seo/src/components/ExtendedTags.astro");

const $$Astro$6 = createAstro("https://flexfy.meta-book.online");
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "D:/src/node_modules/astro-seo/src/components/TwitterTags.astro");

const $$Astro$5 = createAstro("https://flexfy.meta-book.online");
const $$LanguageAlternatesTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "D:/src/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro");

const $$Astro$4 = createAstro("https://flexfy.meta-book.online");
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "D:/src/node_modules/astro-seo/src/SEO.astro");

const Collapse = (props) => {
  const {
    items,
    labels,
    className
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return /* @__PURE__ */ jsx("section", {
    id: "collapse",
    className,
    children: /* @__PURE__ */ jsxs("div", {
      className: "collapse-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "collapse-toggle",
        onClick: () => setIsMenuOpen(!isMenuOpen),
        children: [/* @__PURE__ */ jsx("span", {
          children: labels
        }), /* @__PURE__ */ jsx("span", {
          id: "icon-toggle",
          children: isMenuOpen ? "–" : "+"
        })]
      }), /* @__PURE__ */ jsx("ul", {
        className: `collapse-menu ${isMenuOpen ? "show" : ""}`,
        children: items?.map((item, idx) => /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx("a", {
            "aria-label": item.label,
            className: "collapse-item",
            href: item.code,
            children: item.label
          })
        }, "collapse_menu_" + idx))
      })]
    })
  });
};
const CollapseAni = (props) => {
  const {
    collapseKey,
    btnText,
    RenderHeader,
    className,
    defaultOpen = false,
    children,
    headerIcon = true
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  return /* @__PURE__ */ jsxs("div", {
    className: `"collapse-box" ${className?.root} `,
    "data-idx": collapseKey,
    children: [/* @__PURE__ */ jsx("div", {
      onClick: () => setOpen(!open),
      className: `collapse-container ${className?.header}`,
      children: RenderHeader ? RenderHeader : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("span", {
          className: "header-left",
          children: btnText
        }), headerIcon && /* @__PURE__ */ jsx("span", {
          className: "header-right",
          children: open ? "–" : "+"
        })]
      })
    }), /* @__PURE__ */ jsx(AnimatePresence, {
      initial: true,
      children: open && /* @__PURE__ */ jsx(motion.div, {
        initial: "collapsed",
        className: "content",
        animate: "open",
        exit: "collapsed",
        variants: {
          open: {
            opacity: 1,
            height: "auto"
          },
          collapsed: {
            opacity: 0,
            height: 0
          }
        },
        transition: {
          duration: 0.2
        },
        style: {
          overflowY: "auto"
        },
        children
      }, collapseKey)
    })]
  });
};
__astro_tag_component__(Collapse, "@astrojs/react");
__astro_tag_component__(CollapseAni, "@astrojs/react");

const $$Astro$3 = createAstro("https://flexfy.meta-book.online");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  const footer = await getFooter();
  const currency = [
    { label: "Peso (PHP \u20B1)", value: "PHP" },
    { label: "United States (USD $)", value: "USD" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer id="footer"><div class="information"><div class="logo-container"><div class="logo-footer">${renderComponent($$result, "Image", Image, { "alt": "logo-1", "ariaLabel": "logo-1", "className": "item-6", "src": "/assets/icons/logo-1.svg" })}<p class="title">Sign up for ₱50 OFF your first order!</p></div><div class="div-footersignup"><div class="form"><input placeholder="email address" class="div-needsclick"><button class="btn-join"> join</button></div><p class="text-form"><span class="text-wrapper">*By signing up, you agree to receive marketing emails from FLEXFY.
            You can unsubscribe any time by clicking the link at the bottom of
            our emails.
</span><a href="/privacy-terms">Privacy & Terms.</a></p></div></div><div class="list-infor"><div class="list-footerinfo">${footer?.map((l) => renderTemplate`${renderComponent($$result, "Collapse", Collapse, { "client:load": true, "labels": l.name, "items": l.menu.map((m) => ({ label: m.name, code: m.slug })), "client:component-hydration": "load", "client:component-path": "D:/src/src/components/Collapse", "client:component-export": "Collapse" })}`)}</div><div class="div-footerinfo-icon"><div class="footerinfo-icon"><div class="icons"><span class="icon_instagram"></span><span class="icon_facebook"></span><span class="icon_tiktok"></span></div></div></div></div></div><div class="contact"><div class="copy-right"><p>
© Copyright 2023 FLEXFY / <a href="/terms" class="link-text">Terms</a> /
<a href="/privacy" class="link-text">Privacy</a></p></div><div class="design-info"><p>Designed by AVL Team</p></div><div class="curency-info">${renderComponent($$result, "SelectBox", SelectBox, { "defaultValue": currency[0].value, "items": currency, "className": "select-currency form-input", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/SelectBox", "client:component-export": "SelectBox" })}</div></div></footer>`;
}, "D:/src/src/layouts/Footer.astro");

function Menu({
  slug,
  data
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "menu",
    id: "nav-menu",
    children: /* @__PURE__ */ jsxs("div", {
      className: "list",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "item-link",
        children: [/* @__PURE__ */ jsx("div", {
          className: "label-event",
          children: /* @__PURE__ */ jsxs("span", {
            className: "text-wrapper text-event",
            children: ["SUMMER VIBE COLLECTION", /* @__PURE__ */ jsx("span", {
              className: "text-wrapper text-event-2",
              children: "2023"
            })]
          })
        }), /* @__PURE__ */ jsx("span", {
          className: "toggle-menu close-icon",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/x.svg",
            alt: "close_icon",
            ariaLabel: "close_icon",
            width: 20,
            height: 26
          })
        })]
      }), data && data.map((item, index) => /* @__PURE__ */ jsx("a", {
        href: "/collections/" + item.slug,
        className: `bras-wrapper ${item.slug === slug && "active"}`,
        children: /* @__PURE__ */ jsx("span", {
          className: "menu-title",
          children: item.name
        })
      }, "menu_" + item + "_" + index))]
    })
  });
}
__astro_tag_component__(Menu, "@astrojs/react");

const $$Astro$2 = createAstro("https://flexfy.meta-book.online");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { slug } = Astro2.params;
  const menu = await getMenu();
  return renderTemplate`${maybeRenderHead()}<header id="header-layout" class="header-desktop"><div class="div-shopify-section"><div class="drawler"${addAttribute({ display: "none" }, "style")}></div><div class="banner"><div class="banner-list"><div class="list-other"><a class="item-link" href="/rewards"> Rewards</a><a class="item-link" href="/fit-guide"> Fit guide</a></div></div><a href="/" class="banner-logo" aria-label="logo">${renderComponent($$result, "Logo", Logo, {})}</a><div class="div banner-option"><div class="search-wrapper"><input type="text" name="search" placeholder="search">${renderComponent($$result, "Image", Image, { "id": "search-icon", "alt": "flexfy-search-icon", "ariaLabel": "flexfy-search-icon", "src": "/assets/icons/search-icon.svg", "width": 20, "height": 26 })}</div><div class="div menu-right"><div class="item cart-toggle"><div class="overlap-group">${renderComponent($$result, "Image", Image, { "id": "cart-icon", "alt": "flexfy-cart-icon", "ariaLabel": "flexfy-cart-icon", "src": "/assets/icons/cart.svg", "width": 20, "height": 26 })}${renderComponent($$result, "CartCount", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "D:/src/src/icon", "client:component-export": "CartCount" })}</div></div><a href="/login">${renderComponent($$result, "Image", Image, { "id": "user-icon", "alt": "flexfy-user-icon", "ariaLabel": "flexfy-user-icon", "className": "hover-pointer", "src": "/assets/icons/user.svg", "width": 20, "height": 26 })}</a></div>${renderComponent($$result, "Image", Image, { "alt": "Menu", "ariaLabel": "Menu", "src": "/assets/icons/menu.svg", "className": "hover-pointer toggle-menu menu-icon", "width": 20, "height": 26 })}</div></div><div class="header-menu">${renderComponent($$result, "Menu", Menu, { "data": menu, "slug": slug })}</div></div></header>`;
}, "D:/src/src/layouts/Header.astro");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://flexfy.meta-book.online");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    noindex,
    description = "Find comfortable everyday bras and undies from FLEXFY. We deliver bras and undies that blend high-style and ultimate comfort. Find your style today!",
    image,
    seo = {
      title,
      noindex,
      description,
      openGraph: {
        basic: {
          title,
          type: "website",
          image: image ?? "/logo.svg"
        }
      },
      twitter: {
        card: "summary",
        title,
        description,
        image: image ?? "/logo.svg"
      }
    }
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"><head><meta charset="UTF-8">', "", '<meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>', "</title>", "</head><body>", "<main>", "</main>", "", '<script type="module">\n      const header = document.getElementById("header-layout");\n      const drawler = document.querySelector(".drawler");\n      function toggleMenu() {\n        const elem = document.querySelector("#nav-menu");\n        elem.classList.remove("active");\n        drawler.style.display = "none";\n      }\n      window.addEventListener("resize", () => {\n        toggleMenu();\n      });\n      document.addEventListener("scroll", () => {\n        if (window.screen.width < 768) return;\n        if (document.documentElement.scrollTop > header.offsetHeight) {\n          header?.classList.add("header-mobile");\n        } else {\n          header?.classList.remove("header-mobile");\n        }\n      });\n    <\/script></body></html>'])), noindex && renderTemplate`<meta name="robots" content="noindex">`, !noindex && seo && renderTemplate`${renderComponent($$result, "SEO", $$SEO, { ...seo })}`, title, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "CartModal", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "D:/src/src/components/CartModal", "client:component-export": "CartModal" }));
}, "D:/src/src/layouts/Layout.astro");

const NotFound = () => /* @__PURE__ */ jsx("main", {
  className: "page-not-found",
  style: {
    margin: "auto",
    width: "100%"
  },
  children: /* @__PURE__ */ jsx("section", {
    children: /* @__PURE__ */ jsxs("div", {
      className: "content",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "error",
        children: "404"
      }), /* @__PURE__ */ jsx("h1", {
        className: "title",
        children: "Page not found!"
      }), /* @__PURE__ */ jsx("span", {
        className: "go-home",
        children: /* @__PURE__ */ jsx("a", {
          "aria-label": "Return to home page",
          href: "/",
          children: "Go home?"
        })
      })]
    })
  })
});
__astro_tag_component__(NotFound, "@astrojs/react");

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - Page not found" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "NotFound", NotFound, {})}` })}`;
}, "D:/src/src/pages/[...any].astro");

const $$file = "D:/src/src/pages/[...any].astro";
const $$url = "/[...any]";

const ____any_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, CollapseAni as C, Image as I, SelectBox as S, ____any_ as _, getRatingList as a, StarIcon as b, getReviewByProduct as c, ImageAnimation as d, getColors as e, getSizes as f, getQuestionList as g, getMenu as h, getListProducts as i, getCategoryBySlug as j, getBanners as k, getProductsByHome as l, getPromotion as m, getCommunities as n, getAdvertises as o, getAllCountries as p };
