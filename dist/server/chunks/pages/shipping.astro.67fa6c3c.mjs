import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../astro.f0afcaf5.mjs';
import { P as PaymentHeader, $ as $$PaymentLayout } from './payment-method.astro.351a14fb.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'cookie';
import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'node:fs';
import 'node:http';
import 'node:tls';
import 'mime';
import 'html-escaper';
import 'string-width';
import 'react';
import './_...any_.astro.8e7e2770.mjs';
import 'framer-motion';
import 'zustand';
import 'zustand/middleware';
/* empty css                              */
const ShippingContact = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "payment-contact shipping-contact",
    children: [/* @__PURE__ */ jsx("div", {
      className: "payment-contact-header",
      children: /* @__PURE__ */ jsx("h2", {
        children: "Shipping address"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "payment-contact-content",
      children: /* @__PURE__ */ jsxs("div", {
        className: "shipping-content",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "shipping-content-wrapper",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "shipping-content-info",
            children: [/* @__PURE__ */ jsx("h6", {
              className: "shipping-content-label",
              children: "Contact"
            }), /* @__PURE__ */ jsx("span", {
              className: "shipping-content-session",
              children: "mail"
            })]
          }), /* @__PURE__ */ jsx("a", {
            className: "shipping-content-change",
            href: "/payment",
            children: "Change"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "shipping-content-wrapper",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "shipping-content-info",
            children: [/* @__PURE__ */ jsx("h6", {
              className: "shipping-content-label",
              children: "Ship to"
            }), /* @__PURE__ */ jsx("span", {
              className: "shipping-content-session",
              children: "Address information"
            })]
          }), /* @__PURE__ */ jsx("a", {
            className: "shipping-content-change",
            href: "/payment",
            children: "Change"
          })]
        })]
      })
    })]
  });
};
__astro_tag_component__(ShippingContact, "@astrojs/react");

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$Shipping = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Shipping;
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
  return renderTemplate`${renderComponent($$result, "PaymentLayout", $$PaymentLayout, { "title": "Flexfy - Shipping" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="payment-information shipping-contact"><div class="payment-information-header">${renderComponent($$result2, "PaymentHeader", PaymentHeader, {})}${renderComponent($$result2, "ShippingContact", ShippingContact, {})}<a class="continue-shipping" href="/order-success">Continue to shipping</a></div><div class="payment-footer"><ul class="footer-list">${footer.map((f) => renderTemplate`<li class="item"><a${addAttribute(f.slug, "href")}>${f.name}</a></li>`)}</ul></div></div>` })}`;
}, "D:/src/src/pages/shipping.astro");

const $$file = "D:/src/src/pages/shipping.astro";
const $$url = "/shipping";

export { $$Shipping as default, $$file as file, $$url as url };
