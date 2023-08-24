import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.daf0d03a.mjs';
import { $ as $$Layout } from './_...any_.astro.4e74df7c.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef } from 'react';
import { M as MATCH_EMAIL } from './_slug_.astro.62923030.mjs';
import { F as FormInputEnum, a as FormProvider } from './login.astro.08be5886.mjs';
import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'html-escaper';
import 'framer-motion';
import 'zustand';
import 'zustand/middleware';
/* empty css                              */import 'react-intersection-observer';

const inputs = [
  {
    name: "firstName",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "First name is required" },
    placeholder: "First Name",
    className: "form-input"
  },
  {
    name: "email",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "Email is required" },
    pattern: { value: MATCH_EMAIL, message: "Invalid email" },
    placeholder: "Email Address",
    className: "form-input"
  },
  {
    name: "password",
    type: FormInputEnum.PASSWORD,
    required: { value: true, message: "Password is required" },
    placeholder: "Password",
    className: "form-input",
    minLength: { value: 5, message: "Minimum 5 characters required" },
    maxLength: { value: 35, message: "Minimum 35 characters required" }
  }
];
const RegisterForm = () => {
  const formRef = useRef(null);
  const onSubmit = () => {
    const {
      current: { isValidate, formValues }
    } = formRef;
    console.log(formValues());
  };
  return /* @__PURE__ */ jsxs("div", { className: "form-register-wrapper form-login-wrapper", children: [
    /* @__PURE__ */ jsx("h1", { children: "Create An Account" }),
    /* @__PURE__ */ jsxs("p", { className: "form-description", children: [
      "Sign up now and score ",
      /* @__PURE__ */ jsx("strong", { children: "$10 USD OFF" }),
      " (100 points). Check out faster, access your order history, and rack up Rewards along the way!"
    ] }),
    /* @__PURE__ */ jsx(FormProvider, { inputs, ref: formRef, className: "form-register" }),
    /* @__PURE__ */ jsx("button", { className: "form-button button-register", onClick: onSubmit, children: "Create My Account" }),
    /* @__PURE__ */ jsxs("div", { className: "form-text top", children: [
      /* @__PURE__ */ jsx("span", { children: "Already have an account?" }),
      " ",
      /* @__PURE__ */ jsx("a", { href: "/login", children: "Log in." })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flexfy - Register" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div class="banner-register"></div>
  <div id="form-layout">
    ${renderComponent($$result2, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/login/RegisterForm", "client:component-export": "RegisterForm" })}
  </div>
` })}`;
}, "D:/src/src/pages/register.astro", void 0);

const $$file = "D:/src/src/pages/register.astro";
const $$url = "/register";

export { $$Register as default, $$file as file, $$url as url };
