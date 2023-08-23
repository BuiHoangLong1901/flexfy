import { useRef } from "react";
import { MATCH_EMAIL } from "../../constants/app";
import { FormInputEnum, FormProvider } from "../FormProvider";

const inputs = [
  {
    name: "firstName",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "First name is required" },
    placeholder: "First Name",
    className: "form-input",
  },
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
    minLength: { value: 5, message: "Minimum 5 characters required" },
    maxLength: { value: 35, message: "Minimum 35 characters required" },
  },
];

export const RegisterForm = () => {
  const formRef = useRef(null);

  const onSubmit = () => {
    const {
      current: { isValidate, formValues },
    } = formRef as any;
    console.log(formValues());
  };

  return (
    <div className="form-register-wrapper form-login-wrapper">
      <h1>Create An Account</h1>
      <p className="form-description">
        Sign up now and score <strong>$10 USD OFF</strong> (100 points). Check
        out faster, access your order history, and rack up Rewards along the
        way!
      </p>
      <FormProvider inputs={inputs} ref={formRef} className="form-register" />
      <button className="form-button button-register" onClick={onSubmit}>
        Create My Account
      </button>
      <div className="form-text top">
        <span>Already have an account?</span> <a href="/login">Log in.</a>
      </div>
    </div>
  );
};
