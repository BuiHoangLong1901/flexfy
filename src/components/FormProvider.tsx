import {
  useState,
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  LegacyRef,
  Fragment,
} from "react";
import { SelectBox } from "./SelectBox";
import { motion } from "framer-motion";

export enum FormInputEnum {
  INPUT = "input",
  NUMBER = "number",
  SELECT = "select",
  PASSWORD = "password",
}
interface Props {
  inputs: Input[];
  className?: string;
  setValues?: (item: Record<string, any>) => void;
}

const focusInput = (
  e: FormEvent<HTMLInputElement>,
  addFocus: boolean | string
) => {
  const target = e.target as HTMLInputElement;
  target.classList.toggle("input-focus", addFocus as boolean);
};

export const Form = (
  props: Props,
  ref: { current: HTMLFormElement; values: Record<string, string> }
) => {
  const { inputs, className, setValues } = props;
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>();

  const formValues = () => {
    if (!formRef.current) return;
    const formValues = Object.fromEntries(
      new FormData(formRef.current)
    ) as Record<string, string>;

    let newInputErrors: Record<string, string> = {};
    Object.entries(formValues).forEach(([fieldName, value]) => {
      newInputErrors = {
        ...newInputErrors,
        ...validateForm(fieldName, value),
      };
      setInputErrors(newInputErrors);
    });
    if (Object.keys(newInputErrors).length === 0) {
      return formValues;
    }
    return null;
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        formValues,
        isValidate: Object.keys(inputErrors).length !== 0,
      } as any),
    [inputErrors]
  );

  const validateForm = (fieldName: string, value: string) => {
    const newInputErrors = { ...inputErrors };
    const input = inputs.find((input) => input.name === fieldName);
    if (!input) return;
    const { required, minLength, maxLength, pattern } = input;
    if (required && !value.trim()) {
      newInputErrors[fieldName] = required.message;
    } else if (minLength?.value && value.trim().length < minLength.value) {
      newInputErrors[fieldName] = minLength.message;
    } else if (maxLength?.value && value.trim().length > maxLength.value) {
      newInputErrors[fieldName] = maxLength.message;
    } else if (
      pattern?.value &&
      value.trim() &&
      !new RegExp(pattern.value).test(value.trim())
    ) {
      newInputErrors[fieldName] = pattern.message;
    } else {
      delete newInputErrors[fieldName];
    }
    setInputErrors(newInputErrors);
    return newInputErrors;
  };

  return (
    <form
      autoComplete="on"
      method="post"
      ref={formRef as LegacyRef<HTMLFormElement>}
      className={`${className} form-provider`}
    >
      {inputs.map((input, index) => {
        return input.type === FormInputEnum.SELECT && input.data ? (
          <Fragment key={`FORM_ITEM_${input.name}_${index}`}>
            <SelectBox
              items={input.data}
              label={input.label}
              name={input.name}
              defaultValue={input.data[0]?.value}
              className={`${input.className} ${
                inputErrors[input.name] && "input-error"
              }`}
              onChange={(item) =>
                setValues && setValues({ [input.name]: item })
              }
            />
            {inputErrors[input.name] && (
              <motion.p
                className="input-error-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                {inputErrors[input.name]}
              </motion.p>
            )}
          </Fragment>
        ) : (
          <div
            key={`FORM_ITEM_${input.name}_${index}`}
            className={input.className}
          >
            <input
              name={input.name}
              value={input.value}
              type={input.type}
              placeholder={input.placeholder}
              autoComplete={inputErrors[input.label ?? ""]}
              className={`${inputErrors[input.name] && "input-error"}`}
              onInput={(e) => {
                focusInput(e, true);
                validateForm(input.name, e.currentTarget.value);
              }}
              onFocus={(e) => focusInput(e, true)}
              onBlur={(e) => focusInput(e, false)}
            />
            {inputErrors[input.name] && (
              <motion.p
                className="input-error-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit="collapsed"
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                {inputErrors[input.name]}
              </motion.p>
            )}
          </div>
        );
      })}
    </form>
  );
};

export const FormProvider = forwardRef<unknown, Props>(Form as any);
