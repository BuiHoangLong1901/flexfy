import { Image } from "../Image";

export const PaymentHeader = () => {
  return (
    <div className="payment-header">
      <div className="payment-logo">
        <Image src="/logo.svg" alt="payment-logo" ariaLabel="payment-logo" />
      </div>
      <ul className="payment-nav">
        <li>
          <span>Card</span>
          <span className="icon-arrow-right" />
        </li>
        <li>
          <span>Information</span>
          <span className="icon-arrow-right" />
        </li>
        <li>
          <span>Shipping</span>
          <span className="icon-arrow-right" />
        </li>
        <li>
          <span>Payment</span>
        </li>
      </ul>
    </div>
  );
};
