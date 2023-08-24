import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.9f4d6c5c.mjs';
import { S as SelectBox, $ as $$Layout } from './_...any_.astro.60fe0e4b.mjs';
import { forwardRef, useState, useRef, useImperativeHandle, Fragment } from 'react';
import { motion } from 'framer-motion';
import { jsx, jsxs } from 'react/jsx-runtime';
import { M as MATCH_EMAIL } from './_slug_.astro.18ed53a1.mjs';

var FormInputEnum = /* @__PURE__ */ ((FormInputEnum2) => {
  FormInputEnum2["INPUT"] = "input";
  FormInputEnum2["NUMBER"] = "number";
  FormInputEnum2["SELECT"] = "select";
  FormInputEnum2["PASSWORD"] = "password";
  return FormInputEnum2;
})(FormInputEnum || {});
const focusInput = (e, addFocus) => {
  const target = e.target;
  target.classList.toggle("input-focus", addFocus);
};
const Form = (props, ref) => {
  const {
    inputs,
    className,
    setValues
  } = props;
  const [inputErrors, setInputErrors] = useState({});
  const formRef = useRef();
  const formValues = () => {
    if (!formRef.current)
      return;
    const formValues2 = Object.fromEntries(new FormData(formRef.current));
    let newInputErrors = {};
    Object.entries(formValues2).forEach(([fieldName, value]) => {
      newInputErrors = {
        ...newInputErrors,
        ...validateForm(fieldName, value)
      };
      setInputErrors(newInputErrors);
    });
    if (Object.keys(newInputErrors).length === 0) {
      return formValues2;
    }
    return null;
  };
  useImperativeHandle(ref, () => ({
    formValues,
    isValidate: Object.keys(inputErrors).length !== 0
  }), [inputErrors]);
  const validateForm = (fieldName, value) => {
    const newInputErrors = {
      ...inputErrors
    };
    const input = inputs.find((input2) => input2.name === fieldName);
    if (!input)
      return;
    const {
      required,
      minLength,
      maxLength,
      pattern
    } = input;
    if (required && !value.trim()) {
      newInputErrors[fieldName] = required.message;
    } else if (minLength?.value && value.trim().length < minLength.value) {
      newInputErrors[fieldName] = minLength.message;
    } else if (maxLength?.value && value.trim().length > maxLength.value) {
      newInputErrors[fieldName] = maxLength.message;
    } else if (pattern?.value && value.trim() && !new RegExp(pattern.value).test(value.trim())) {
      newInputErrors[fieldName] = pattern.message;
    } else {
      delete newInputErrors[fieldName];
    }
    setInputErrors(newInputErrors);
    return newInputErrors;
  };
  return /* @__PURE__ */ jsx("form", {
    autoComplete: "on",
    method: "post",
    ref: formRef,
    className: `${className} form-provider`,
    children: inputs.map((input, index) => {
      return input.type === "select" && input.data ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(SelectBox, {
          items: input.data,
          label: input.label,
          name: input.name,
          defaultValue: input.data[0]?.value,
          className: `${input.className} ${inputErrors[input.name] && "input-error"}`,
          onChange: (item) => setValues && setValues({
            [input.name]: item
          })
        }), inputErrors[input.name] && /* @__PURE__ */ jsx(motion.p, {
          className: "input-error-message",
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
          children: inputErrors[input.name]
        })]
      }, `FORM_ITEM_${input.name}_${index}`) : /* @__PURE__ */ jsxs("div", {
        className: input.className,
        children: [/* @__PURE__ */ jsx("input", {
          name: input.name,
          value: input.value,
          type: input.type,
          placeholder: input.placeholder,
          autoComplete: inputErrors[input.label ?? ""],
          className: `${inputErrors[input.name] && "input-error"}`,
          onInput: (e) => {
            focusInput(e, true);
            validateForm(input.name, e.currentTarget.value);
          },
          onFocus: (e) => focusInput(e, true),
          onBlur: (e) => focusInput(e, false)
        }), inputErrors[input.name] && /* @__PURE__ */ jsx(motion.p, {
          className: "input-error-message",
          initial: {
            opacity: 0,
            y: 10
          },
          animate: {
            opacity: 1,
            y: 0
          },
          exit: "collapsed",
          transition: {
            duration: 0.25,
            delay: 0.05
          },
          children: inputErrors[input.name]
        })]
      }, `FORM_ITEM_${input.name}_${index}`);
    })
  });
};
const FormProvider = forwardRef(Form);
__astro_tag_component__(Form, "@astrojs/react");

const inputs = [{
  name: "email",
  type: FormInputEnum.INPUT,
  required: {
    value: true,
    message: "Email is required"
  },
  pattern: {
    value: MATCH_EMAIL,
    message: "Invalid email"
  },
  placeholder: "Email Address",
  className: "form-input"
}, {
  name: "password",
  type: FormInputEnum.PASSWORD,
  required: {
    value: true,
    message: "Password is required"
  },
  placeholder: "Password",
  className: "form-input"
}];
const LoginForm = () => {
  const formRef = useRef(null);
  const onSubmit = () => {
    const {
      current: {
        isValidate,
        formValues
      }
    } = formRef;
    console.log(formValues());
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "form-login-wrapper",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Already a Member? Welcome Back!"
    }), /* @__PURE__ */ jsx("p", {
      className: "form-description",
      children: "Access your order history, check your points balance, and claim your FLEXFY Rewards."
    }), /* @__PURE__ */ jsx(FormProvider, {
      inputs,
      ref: formRef,
      className: "login-form"
    }), /* @__PURE__ */ jsx("button", {
      className: "form-button",
      onClick: onSubmit,
      children: "sign in"
    }), /* @__PURE__ */ jsxs("div", {
      className: "form-text top",
      children: [/* @__PURE__ */ jsx("span", {
        children: "Don't have an account?"
      }), " ", /* @__PURE__ */ jsx("a", {
        href: "/register",
        children: "Sign up."
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "form-text",
      children: /* @__PURE__ */ jsx("a", {
        href: "#",
        children: "Forgot your password?"
      })
    })]
  });
};
__astro_tag_component__(LoginForm, "@astrojs/react");

const CustomerForm = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "customer-wrapper form-login-wrapper",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "New? Sign Up for Rewards!"
    }), /* @__PURE__ */ jsx("p", {
      className: "form-description",
      children: "Life’s sweeter as a member! Create an account to join our super cool Rewards Program – that’s an instant ₱50 OFF. Rack up points with every purchase - the more you shop, the more you earn!"
    }), /* @__PURE__ */ jsx("button", {
      className: "form-button",
      children: /* @__PURE__ */ jsx("a", {
        href: "/register",
        children: "create account"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "form-image-wrap"
    })]
  });
};
__astro_tag_component__(CustomerForm, "@astrojs/react");

const $$Astro = createAstro("https://flexfy.meta-book.online");
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flexfy - Login" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="banner-login-screen"></div><div id="form-layout">${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/src/src/components/login/LoginForm", "client:component-export": "LoginForm" })}${renderComponent($$result2, "CustomerForm", CustomerForm, {})}</div>` })}`;
}, "D:/src/src/pages/login.astro", void 0);

const $$file = "D:/src/src/pages/login.astro";
const $$url = "/login";

const login = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { FormInputEnum as F, FormProvider as a, login as l };
