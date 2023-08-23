import { Image } from "../Image";

export const PaymentCheckout = () => {
  return (
    <div className="payment-checkout">
      <div className="payment-multiple-checkout">
        <div className="payment-checkout-heading">
          <div className="pseudo left"></div>
          <span className="header-content">Express checkout</span>
          <div className="pseudo right"></div>
        </div>
        <div className="payment-checkout-method">
          <div className="method-item shop-pay">
            <Image
              src="/assets/icons/shop-pay.svg"
              alt="shop-pay"
              className="method-img"
              ariaLabel="img_shop_pay"
            />
          </div>
          <div className="method-item amazon">
            <Image src="/assets/icons/amazon.svg" alt="amazon" className="method-img" ariaLabel="img_amazon"/>
          </div>
          <div className="method-item paypal">
            <Image
              src="/assets/icons/paypal-1.svg"
              alt="paypal"
              className="method-img"
              ariaLabel="img_paypal"
            />
          </div>
        </div>
      </div>
      <div className="payment-separator">
        <div className="pseudo"></div>
        <span className="header-content">OR</span>
        <div className="pseudo"></div>
      </div>
    </div>
  );
};
