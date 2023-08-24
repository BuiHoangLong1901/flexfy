import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../astro.7bf5232d.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { I as Image, p as getAllCountries } from './_...any_.astro.5b9f9748.mjs';
import { P as PaymentHeader, $ as $$PaymentLayout } from './payment-method.astro.edb88e5e.mjs';
import { useState, useRef, useEffect } from 'react';
import { F as FormInputEnum, a as FormProvider } from './login.astro.bf364275.mjs';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'cookie';
import 'kleur/colors';
import 'mime';
import 'string-width';
import 'html-escaper';
import 'zustand';
import 'zustand/middleware';
/* empty css                              */import './_slug_.astro.f53fd95b.mjs';

const Contact = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "payment-contact",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "payment-contact-header",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Contact"
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Already have an account? ", /* @__PURE__ */ jsx("a", {
          href: "/login",
          children: "Log in"
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "payment-contact-content",
      children: [/* @__PURE__ */ jsx("div", {
        className: "input-form",
        children: /* @__PURE__ */ jsx("input", {
          type: "text",
          placeholder: "Email",
          className: "input-email"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "payment-contact-confirm",
        children: /* @__PURE__ */ jsxs("label", {
          htmlFor: "checkbox",
          className: "checkbox payment-checkbox",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "checkbox-div",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              defaultChecked: true,
              id: "checkbox"
            }), /* @__PURE__ */ jsx("span", {
              className: "check-icon"
            })]
          }), /* @__PURE__ */ jsx("span", {
            children: "Email me with new product launches, early accesses, exclusive offers and more!"
          })]
        })
      })]
    })]
  });
};
__astro_tag_component__(Contact, "@astrojs/react");

const PaymentCheckout = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "payment-checkout",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "payment-multiple-checkout",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "payment-checkout-heading",
        children: [/* @__PURE__ */ jsx("div", {
          className: "pseudo left"
        }), /* @__PURE__ */ jsx("span", {
          className: "header-content",
          children: "Express checkout"
        }), /* @__PURE__ */ jsx("div", {
          className: "pseudo right"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "payment-checkout-method",
        children: [/* @__PURE__ */ jsx("div", {
          className: "method-item shop-pay",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/shop-pay.svg",
            alt: "shop-pay",
            className: "method-img",
            ariaLabel: "img_shop_pay"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "method-item amazon",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/amazon.svg",
            alt: "amazon",
            className: "method-img",
            ariaLabel: "img_amazon"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "method-item paypal",
          children: /* @__PURE__ */ jsx(Image, {
            src: "/assets/icons/paypal-1.svg",
            alt: "paypal",
            className: "method-img",
            ariaLabel: "img_paypal"
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "payment-separator",
      children: [/* @__PURE__ */ jsx("div", {
        className: "pseudo"
      }), /* @__PURE__ */ jsx("span", {
        className: "header-content",
        children: "OR"
      }), /* @__PURE__ */ jsx("div", {
        className: "pseudo"
      })]
    })]
  });
};
__astro_tag_component__(PaymentCheckout, "@astrojs/react");

const ContactUser = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "payment-contact",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "payment-contact-header",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Contact"
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Already have an account? ", /* @__PURE__ */ jsx("a", {
          href: "/login",
          children: "Log in"
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "payment-contact-content",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "user-info",
        children: [/* @__PURE__ */ jsx("div", {
          className: "user-avatar",
          children: /* @__PURE__ */ jsx("img", {
            src: "/assets/icons/user-1.svg",
            alt: "user"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "user-content",
          children: [/* @__PURE__ */ jsx("p", {
            children: "Name Account (Email)"
          }), /* @__PURE__ */ jsx("a", {
            href: "/login",
            "aria-label": "btn-logout",
            children: "Log out"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "payment-contact-confirm",
        children: /* @__PURE__ */ jsxs("label", {
          htmlFor: "checkbox",
          className: "checkbox payment-checkbox",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "checkbox-div",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              defaultChecked: true,
              id: "checkbox"
            }), /* @__PURE__ */ jsx("span", {
              className: "check-icon"
            })]
          }), /* @__PURE__ */ jsx("span", {
            children: "Email me with new product launches, early accesses, exclusive offers and more!"
          })]
        })
      })]
    })]
  });
};
__astro_tag_component__(ContactUser, "@astrojs/react");

const boxVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  },
  hidden: {
    opacity: 0,
    x: -10
  }
};
let inputs = [{
  name: "country_region",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.SELECT,
  label: "Country/region",
  data: []
}, {
  name: "firstName",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.INPUT,
  placeholder: "First name",
  className: "payment-input-address-detail",
  minLength: {
    value: 10,
    message: "Minimum 10 characters required"
  },
  maxLength: {
    value: 25,
    message: "Minimum 25 characters required"
  }
}, {
  name: "lastName",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.INPUT,
  placeholder: "Last name",
  className: "payment-input-address-detail",
  minLength: {
    value: 10,
    message: "Minimum 10 characters required"
  },
  maxLength: {
    value: 25,
    message: "Minimum 25 characters required"
  }
}, {
  name: "address",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.INPUT,
  placeholder: "Address",
  className: "payment-input-address-detail",
  minLength: {
    value: 10,
    message: "Minimum 10 characters required"
  },
  maxLength: {
    value: 25,
    message: "Minimum 25 characters required"
  }
}, {
  name: "optional",
  type: FormInputEnum.INPUT,
  placeholder: "Apartment, suite, etc. (optional)",
  className: "payment-input-address-detail"
}, {
  name: "city",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.INPUT,
  placeholder: "City",
  className: "payment-input-address-detail",
  minLength: {
    value: 10,
    message: "Minimum 10 characters required"
  },
  maxLength: {
    value: 25,
    message: "Minimum 25 characters required"
  }
}, {
  name: "state",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.SELECT,
  label: "State",
  className: "select-state",
  data: []
}, {
  name: "zipCode",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.INPUT,
  placeholder: "ZIP code",
  className: "payment-input-address-detail"
}, {
  name: "phoneNumber",
  required: {
    value: true,
    message: "This field is required"
  },
  type: FormInputEnum.NUMBER,
  placeholder: "Phone",
  className: "payment-input-phone"
}];
const ShippingAddress = () => {
  const control = useAnimation();
  const [provinces, setProvinces] = useState();
  const [countries, setCountries] = useState([]);
  const [ref, inView] = useInView();
  const formRef = useRef(null);
  const fetchData = async () => {
    const data = await getAllCountries();
    data && setCountries(data);
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
      countries.length == 0 && fetchData();
    }
  }, [control, inView]);
  const selects = {
    country_region: {
      data: countries,
      map: (c) => ({
        label: c.name,
        value: c.code,
        ...c
      })
    },
    state: {
      data: provinces || countries[0]?.provinces,
      map: (p) => ({
        label: p.name,
        value: p.code
      })
    }
  };
  inputs = inputs.map((input) => {
    const data = selects[input.name]?.data;
    const map = selects[input.name]?.map;
    return {
      ...input,
      data: data?.map(map)
    };
  });
  const setValues = (values) => {
    setProvinces(values["country_region"].provinces);
  };
  const handleSubmit = () => {
    const {
      current: {
        isValidate,
        formValues
      }
    } = formRef;
    console.log(formValues());
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "payment-shipping-address",
      ref,
      children: [/* @__PURE__ */ jsx("div", {
        className: "payment-shipping-title",
        children: /* @__PURE__ */ jsx("h2", {
          children: "Shipping address"
        })
      }), /* @__PURE__ */ jsxs(motion.div, {
        variants: boxVariant,
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
        children: [/* @__PURE__ */ jsx(FormProvider, {
          className: "payment-address-form",
          ref: formRef,
          inputs,
          setValues
        }), /* @__PURE__ */ jsx("div", {
          className: "payment-contact-confirm",
          children: /* @__PURE__ */ jsxs("label", {
            htmlFor: "checkbox-2",
            className: "checkbox",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "checkbox-div",
              children: [/* @__PURE__ */ jsx("input", {
                type: "checkbox",
                defaultChecked: true,
                name: "checkbok-1",
                id: "checkbox-2"
              }), /* @__PURE__ */ jsx("span", {
                className: "check-icon"
              })]
            }), /* @__PURE__ */ jsx("span", {
              children: "Text me about secret waitlists, VIP-only promotions and crew-obsessed drops!"
            })]
          })
        }), /* @__PURE__ */ jsx("button", {
          className: "continue-shipping",
          type: "submit",
          onClick: handleSubmit,
          children: "Continue to shipping"
        })]
      })]
    })
  });
};
__astro_tag_component__(ShippingAddress, "@astrojs/react");

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$Payment = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Payment;
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
  return renderTemplate`${renderComponent($$result, "PaymentLayout", $$PaymentLayout, { "title": "Flexfy - Payment" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="payment-information"><div class="payment-information-header">${renderComponent($$result2, "PaymentHeader", PaymentHeader, {})}${renderComponent($$result2, "PaymentCheckout", PaymentCheckout, {})}${renderTemplate`${renderComponent($$result2, "ContactUser", ContactUser, {})}` }${renderComponent($$result2, "ShippingAddress", ShippingAddress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/payment/ShippingAddress", "client:component-export": "ShippingAddress" })}</div><div class="payment-footer"><ul class="footer-list">${footer.map((f) => renderTemplate`<li class="item"><a${addAttribute(f.slug, "href")}>${f.name}</a></li>`)}</ul></div></div>` })}`;
}, "D:/src/src/pages/payment.astro", void 0);

const $$file = "D:/src/src/pages/payment.astro";
const $$url = "/payment";

export { $$Payment as default, $$file as file, $$url as url };
