import { useRef } from "react";
import { FormInputEnum, FormProvider } from "../FormProvider";
import { MATCH_EMAIL } from "../../constants/app";

const inputs = [
  {
    name: "email",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "Email is required" },
    pattern: { value: MATCH_EMAIL, message: "Invalid email" },
    placeholder: "Email Address",
    className: "form-input",
  },
  {
    name: "password",
    type: FormInputEnum.PASSWORD,
    required: { value: true, message: "Password is required" },
    placeholder: "Password",
    className: "form-input",
  },
];

export const LoginForm = () => {
  const formRef = useRef(null);

  const onSubmit = () => {
    const {
      current: { isValidate, formValues },
    } = formRef as any;
    console.log(formValues());
  };
  return (
    <div className="form-login-wrapper">
      <h1>Already a Member? Welcome Back!</h1>
      <p className="form-description">
        Access your order history, check your points balance, and claim your
        FLEXFY Rewards.
      </p>
      <FormProvider inputs={inputs} ref={formRef} className="login-form" />
      <button className="form-button" onClick={onSubmit}>
        sign in
      </button>
      <div className="form-text top">
        <span>Don't have an account?</span> <a href="/register">Sign up.</a>
      </div>
      <div className="form-text">
        <a href="#">Forgot your password?</a>
      </div>
    </div>
  );
};
