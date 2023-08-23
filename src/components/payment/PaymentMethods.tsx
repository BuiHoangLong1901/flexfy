import { useState } from "react";
import { CollapseAni } from "../Collapse";
import { Image } from "../Image";

const methods = [
  {
    title: "USPS Priority",
  },
  {
    title: "Master card",
    image: "/assets/icons/Mastercard.svg",
  },
  {
    title: "Paypal",
    image: "/assets/icons/paypal.svg",
  },
  {
    title: "COD",
  },
];

export const PaymentMethods = () => {
  const [idxOpen, setIdxOpen] = useState(0);
  return (
    <div className="payment-contact payment-method">
      <div className="payment-contact-header">
        <h2>Payment Method</h2>
      </div>
      <div className="payment-method">
        {methods.map((method, idx) => (
          <PaymentMethod
            method={method}
            key={`${method.title}_` + idx}
            idx={idx}
            idxOpen={idxOpen}
            setIdxOpen={setIdxOpen}
          />
        ))}
      </div>
    </div>
  );
};

const PaymentMethod = ({
  method,
  idx,
  idxOpen,
  setIdxOpen,
}: {
  method: { image?: string; title: string };
  idx: number;
  idxOpen: number;
  setIdxOpen: (idx: number) => void;
}) => {
  const isUspsPriority = method.title === "USPS Priority";
  return (
    <CollapseAni
      RenderHeader={
        <div
          className={`${
            isUspsPriority && "border"
          } usps-priority border-bottom`}
          onClick={() => setIdxOpen(idx)}
        >
          <div className="wrapper-method">
            <button
              type="button"
              className={`${idx === idxOpen && "checked"} btn checkbox`}
            />
            {method.image ? (
              <div className="method-thumbnail">
                <Image
                  src={method.image}
                  alt={method.title}
                  ariaLabel={method.title}
                />
              </div>
            ) : (
              <span className="method-name">{method.title}</span>
            )}
          </div>
          {isUspsPriority && (
            <>
              <div className="visa">
                <Image
                  src="/assets/icons/visa.svg"
                  alt="visa"
                  ariaLabel="visa"
                />
              </div>
              <div className="master-card">
                <Image
                  src="/assets/icons/Mastercard.svg"
                  alt="Mastercard"
                  ariaLabel="Mastercard"
                />
              </div>
              <div className="paypal">
                <Image
                  src="/assets/icons/paypal.svg"
                  alt="paypal"
                  ariaLabel="paypal"
                />
              </div>
            </>
          )}
        </div>
      }
      className={{ root: "collapse-root" }}
      defaultOpen={idx === idxOpen}
    >
      <Form />
    </CollapseAni>
  );
};

const Form = () => {
  return (
    <form action="" className="method-detail">
      <input type="text" placeholder="Priority" />
      <input type="text" placeholder="Name on card" />
      <div className="wrapper-row">
        <input
          type="text"
          name=""
          id=""
          placeholder="Date"
          className="input-date"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Security code"
          className="input-security"
        />
      </div>
    </form>
  );
};
