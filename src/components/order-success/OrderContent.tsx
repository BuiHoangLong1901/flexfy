import { Image } from "../Image";
import ThanksBanner from "../../components/order-success/thank-you-banner.png";

export const OrderContent = () => {
  return (
    <div className="content">
      <div className="order-thankyou">
        <Image
          src={ThanksBanner}
          alt="order-thank-banner"
          className="order-thank-banner"
          ariaLabel="order_thankbanner"
        />
        <h2 className="order-thanks-text">Thank you for your order!</h2>
        <div className="order-information">
          <div className="order-code">
            <h2>Order number is: 30902143</h2>
          </div>
          <div className="order-confirm">
            <h2>You will receive an email confirmation shortly from</h2>&nbsp;
            <a href="#">infor@flexfy.co</a>
          </div>
          <h2 className="print-receipt">Print receipt</h2>
        </div>
        <div className="join-community">
          <h2 className="title">JOIN OUR COMMUNITY</h2>
          <div className="media-social">
            <Image
              src="/assets/icons/Facebook.svg"
              alt="facebook"
              className="facebook"
              ariaLabel="facebook"
            />
            <Image
              src="/assets/icons/Instagram.svg"
              alt="instargram"
              className="instargram"
              ariaLabel="instargram"
            />
            <Image
              src="/assets/icons/tiktok.svg"
              alt="tiktok"
              className="tiktok"
              ariaLabel="tiktok"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
