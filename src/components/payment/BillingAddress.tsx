import { useState } from "react";

const express = [
  {
    title: "USPS Express",
  },
  {
    title: "USPS Express",
  },
  {
    title: "COD",
  },
];

export const BillingAddress = () => {
  const [checkboxIdx, setCheckboxIndx] = useState<number | undefined>();

  return (
    <div className="billing-address">
      <div className="billing-address-head">
        <h3>Billing address</h3>
        <p>Select the address that matches your card or paument method.</p>
      </div>
      <div className="billing-address-list">
        {express.map((e, idx) => (
          <div className="billing-address-item" key={idx}>
            <label htmlFor={"usps-express_" + idx}>
              <button
                id={"usps-express_" + idx}
                name="billing-group"
                className={`${checkboxIdx == idx && "checked"} checkbox`}
                onClick={() => setCheckboxIndx(idx)}
              />
              <span>{e.title}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
