import { useEffect, useRef, useState } from "react";
import { FormInputEnum, FormProvider } from "../FormProvider";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getAllCountries } from "../../server-side/api";

type SelectMap = {
  [key: string]: {
    data: any;
    map: (item: any) => any;
  };
};

type Country_Province = {
  label: string;
  value: string;
  provinces?: never[];
}[];

const boxVariant: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  hidden: { opacity: 0, x: -10 },
};

let inputs: Input[] = [
  {
    name: "country_region",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.SELECT,
    label: "Country/region",
    data: [],
  },
  {
    name: "firstName",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.INPUT,
    placeholder: "First name",
    className: "payment-input-address-detail",
    minLength: { value: 10, message: "Minimum 10 characters required" },
    maxLength: { value: 25, message: "Minimum 25 characters required" },
  },
  {
    name: "lastName",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.INPUT,
    placeholder: "Last name",
    className: "payment-input-address-detail",
    minLength: { value: 10, message: "Minimum 10 characters required" },
    maxLength: { value: 25, message: "Minimum 25 characters required" },
  },
  {
    name: "address",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.INPUT,
    placeholder: "Address",
    className: "payment-input-address-detail",
    minLength: { value: 10, message: "Minimum 10 characters required" },
    maxLength: { value: 25, message: "Minimum 25 characters required" },
  },
  {
    name: "optional",
    type: FormInputEnum.INPUT,
    placeholder: "Apartment, suite, etc. (optional)",
    className: "payment-input-address-detail",
  },
  {
    name: "city",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.INPUT,
    placeholder: "City",
    className: "payment-input-address-detail",
    minLength: { value: 10, message: "Minimum 10 characters required" },
    maxLength: { value: 25, message: "Minimum 25 characters required" },
  },
  {
    name: "state",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.SELECT,
    label: "State",
    className: "select-state",
    data: [],
  },
  {
    name: "zipCode",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.INPUT,
    placeholder: "ZIP code",
    className: "payment-input-address-detail",
  },
  {
    name: "phoneNumber",
    required: { value: true, message: "This field is required" },
    type: FormInputEnum.NUMBER,
    placeholder: "Phone",
    className: "payment-input-phone",
  },
];

export const ShippingAddress = () => {
  const control = useAnimation();
  const [provinces, setProvinces] = useState<Country_Province>();
  const [countries, setCountries] = useState<Countries[]>([]);
  const [ref, inView] = useInView();
  const formRef = useRef<{
    current: HTMLFormElement;
    values: Record<string, string>;
  }>(null);
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

  const selects: SelectMap = {
    country_region: {
      data: countries,
      map: (c: any) => ({
        label: c.name,
        value: c.code,
        ...c,
      }),
    },
    state: {
      data: provinces || countries[0]?.provinces,
      map: (p: any) => ({
        label: p.name,
        value: p.code,
      }),
    },
  };

  inputs = inputs.map((input) => {
    const data = selects[input.name]?.data;
    const map = selects[input.name]?.map;
    return {
      ...input,
      data: data?.map(map),
    };
  });

  const setValues = (values: any) => {
    setProvinces(values["country_region"].provinces);
  };

  const handleSubmit = () => {
    const {
      current: { isValidate, formValues },
    } = formRef as any;
    console.log(formValues());
  };

  return (
    <>
      <div className="payment-shipping-address" ref={ref}>
        <div className="payment-shipping-title">
          <h2>Shipping address</h2>
        </div>
        <motion.div
          variants={boxVariant}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormProvider
            className="payment-address-form"
            ref={formRef}
            inputs={inputs}
            setValues={setValues}
          />
          <div className="payment-contact-confirm">
            <label htmlFor="checkbox-2" className="checkbox">
              <div className="checkbox-div">
                <input
                  type="checkbox"
                  defaultChecked
                  name="checkbok-1"
                  id="checkbox-2"
                />
                <span className="check-icon"></span>
              </div>
              <span>
                Text me about secret waitlists, VIP-only promotions and
                crew-obsessed drops! 
              </span>
            </label>
          </div>
          <button
            className="continue-shipping"
            type="submit"
            onClick={handleSubmit}
          >
            Continue to shipping
          </button>
        </motion.div>
      </div>
    </>
  );
};
