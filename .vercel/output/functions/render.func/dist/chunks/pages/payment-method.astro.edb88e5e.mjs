import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, f as renderHead, e as renderSlot, d as renderComponent, m as maybeRenderHead } from '../astro.7bf5232d.mjs';
import { useState } from 'react';
import { C as CollapseAni, I as Image } from './_...any_.astro.5b9f9748.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
/* empty css                              */
const methods = [{
  title: "USPS Priority"
}, {
  title: "Master card",
  image: "/assets/icons/Mastercard.svg"
}, {
  title: "Paypal",
  image: "/assets/icons/paypal.svg"
}, {
  title: "COD"
}];
const PaymentMethods = () => {
  const [idxOpen, setIdxOpen] = useState(0);
  return /* @__PURE__ */ jsxs("div", {
    className: "payment-contact payment-method",
    children: [/* @__PURE__ */ jsx("div", {
      className: "payment-contact-header",
      children: /* @__PURE__ */ jsx("h2", {
        children: "Payment Method"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "payment-method",
      children: methods.map((method, idx) => /* @__PURE__ */ jsx(PaymentMethod, {
        method,
        idx,
        idxOpen,
        setIdxOpen
      }, `${method.title}_` + idx))
    })]
  });
};
const PaymentMethod = ({
  method,
  idx,
  idxOpen,
  setIdxOpen
}) => {
  const isUspsPriority = method.title === "USPS Priority";
  return /* @__PURE__ */ jsx(CollapseAni, {
    RenderHeader: /* @__PURE__ */ jsxs("div", {
      className: `${isUspsPriority && "border"} usps-priority border-bottom`,
      onClick: () => setIdxOpen(idx),
      children: [/* @__PURE__ */ jsxs("div", {
        className: "wrapper-method",
        children: [/* @__PURE__ */ jsx("button", {
          type: "button",
          className: `${idx === idxOpen && "checked"} btn checkbox`
        }), method.image ? /* @__PURE__ */ jsx("div", {
          className: "method-thumbnail",
          children: /* @__PURE__ */ jsx(Image, {
            src: method.image,
            alt: method.title,
            ariaLabel: method.title
          })
        }) : /* @__PURE__ */ jsx("span", {
          className: "method-name",
          children: method.title
        })]
      }), isUspsPriority && /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "visa",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/visa.svg",
            alt: "visa",
            ariaLabel: "visa"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "master-card",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/Mastercard.svg",
            alt: "Mastercard",
            ariaLabel: "Mastercard"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "paypal",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/paypal.svg",
            alt: "paypal",
            ariaLabel: "paypal"
          })
        })]
      })]
    }),
    className: {
      root: "collapse-root"
    },
    defaultOpen: idx === idxOpen,
    children: /* @__PURE__ */ jsx(Form, {})
  });
};
const Form = () => {
  return /* @__PURE__ */ jsxs("form", {
    action: "",
    className: "method-detail",
    children: [/* @__PURE__ */ jsx("input", {
      type: "text",
      placeholder: "Priority"
    }), /* @__PURE__ */ jsx("input", {
      type: "text",
      placeholder: "Name on card"
    }), /* @__PURE__ */ jsxs("div", {
      className: "wrapper-row",
      children: [/* @__PURE__ */ jsx("input", {
        type: "text",
        name: "",
        id: "",
        placeholder: "Date",
        className: "input-date"
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        name: "",
        id: "",
        placeholder: "Security code",
        className: "input-security"
      })]
    })]
  });
};
__astro_tag_component__(PaymentMethods, "@astrojs/react");

const PaymentHeader = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "payment-header",
    children: [/* @__PURE__ */ jsx("div", {
      className: "payment-logo",
      children: /* @__PURE__ */ jsx(Image, {
        src: "/logo.svg",
        alt: "payment-logo",
        ariaLabel: "payment-logo"
      })
    }), /* @__PURE__ */ jsxs("ul", {
      className: "payment-nav",
      children: [/* @__PURE__ */ jsxs("li", {
        children: [/* @__PURE__ */ jsx("span", {
          children: "Card"
        }), /* @__PURE__ */ jsx("span", {
          className: "icon-arrow-right"
        })]
      }), /* @__PURE__ */ jsxs("li", {
        children: [/* @__PURE__ */ jsx("span", {
          children: "Information"
        }), /* @__PURE__ */ jsx("span", {
          className: "icon-arrow-right"
        })]
      }), /* @__PURE__ */ jsxs("li", {
        children: [/* @__PURE__ */ jsx("span", {
          children: "Shipping"
        }), /* @__PURE__ */ jsx("span", {
          className: "icon-arrow-right"
        })]
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx("span", {
          children: "Payment"
        })
      })]
    })]
  });
};
__astro_tag_component__(PaymentHeader, "@astrojs/react");

const express = [{
  title: "USPS Express"
}, {
  title: "USPS Express"
}, {
  title: "COD"
}];
const BillingAddress = () => {
  const [checkboxIdx, setCheckboxIndx] = useState();
  return /* @__PURE__ */ jsxs("div", {
    className: "billing-address",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "billing-address-head",
      children: [/* @__PURE__ */ jsx("h3", {
        children: "Billing address"
      }), /* @__PURE__ */ jsx("p", {
        children: "Select the address that matches your card or paument method."
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "billing-address-list",
      children: express.map((e, idx) => /* @__PURE__ */ jsx("div", {
        className: "billing-address-item",
        children: /* @__PURE__ */ jsxs("label", {
          htmlFor: "usps-express_" + idx,
          children: [/* @__PURE__ */ jsx("button", {
            id: "usps-express_" + idx,
            name: "billing-group",
            className: `${checkboxIdx == idx && "checked"} checkbox`,
            onClick: () => setCheckboxIndx(idx)
          }), /* @__PURE__ */ jsx("span", {
            children: e.title
          })]
        })
      }, idx))
    })]
  });
};
__astro_tag_component__(BillingAddress, "@astrojs/react");

const $$Astro$1 = createAstro("https://flexfy.meta-book.online");
const $$PaymentLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PaymentLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Find comfortable everyday bras and undies from FLEXFY. We deliver bras and undies that blend high-style and ultimate comfort. Find your style today!"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body><main><div id="Payment"><div class="payment-container">${renderSlot($$result, $$slots["default"])}<div class="payment-order-summary-container"><div class="pseudo"></div>${renderComponent($$result, "OrderSummary", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "D:/src/src/components/payment/OrderSummary", "client:component-export": "OrderSummary" })}</div></div></div></main></body></html>`;
}, "D:/src/src/layouts/PaymentLayout.astro", void 0);

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$PaymentMethod = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PaymentMethod;
  const footer = [
    {
      name: "Refund policy",
      slug: "/refund-policy"
    },
    {
      name: "Shipping policy",
      slug: "/shipping-policy"
    },
    {
      name: "Privacy policy",
      slug: "/privacy-policy"
    },
    {
      name: "Terms of service",
      slug: "/terms-of-service"
    },
    {
      name: "Contact information",
      slug: "/contact-information"
    }
  ];
  return renderTemplate`${renderComponent($$result, "PaymentLayout", $$PaymentLayout, { "title": "Flexfy - Shipping" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="payment-information shipping-contact"><div class="payment-information-header">${renderComponent($$result2, "PaymentHeader", PaymentHeader, {})}${renderComponent($$result2, "PaymentMethods", PaymentMethods, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/payment/PaymentMethods", "client:component-export": "PaymentMethods" })}${renderComponent($$result2, "BillingAddress", BillingAddress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/payment/BillingAddress", "client:component-export": "BillingAddress" })}<a class="continue-shipping" href="/shipping">Continue to shipping</a></div><div class="payment-footer"><ul class="footer-list">${footer.map((f) => renderTemplate`<li class="item"><a${addAttribute(f.slug, "href")}>${f.name}</a></li>`)}</ul></div></div>` })}`;
}, "D:/src/src/pages/payment-method.astro", void 0);

const $$file = "D:/src/src/pages/payment-method.astro";
const $$url = "/payment-method";

const paymentMethod = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PaymentMethod,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$PaymentLayout as $, PaymentHeader as P, paymentMethod as p };
