import { useState } from "react";
import { currencyFormat } from "../../utils";
import { motion } from "framer-motion";
import { Image } from "../Image";
import Modal from "../modal";
import { useCartStore } from "../../store/cart-store";

const shipping = "Calculated at next step";
const currency = "USD";

export const OrderSummary = () => {
  const { items, totalPrice } = useCartStore((s) => s.cart);
  return (
    <div className="payment-order-summary">
      <div className="order-items">
        {items.map((item, index) => {
          return (
            <motion.div
              className="order-item"
              key={item.key}
              initial={{ opacity: 0, translateY: 30 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.1 * (index + 1) }}
            >
              <div className="item-thumbnail">
                <Image
                  src={item.thumbnail ?? ""}
                  alt={"thumbnail_" + item.name}
                  ariaLabel={"order_" + item.name}
                />
                <span>{item.quantity}</span>
              </div>
              <div className="item-content">
                <p className="item-name">{item.name}</p>
                <p className="item-category">
                  {item.option?.size}/ {item.option?.color}
                </p>
              </div>
              <div className="item-price">
                {currencyFormat(item.price * item.quantity, "USD", 2)}
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        className="summary-section"
        initial={{ opacity: 0, translateY: 30 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <div className="gift-card">
          <input
            type="text"
            className="gift-card-input"
            placeholder="Gift card or discount code"
          />
          <button>Apply</button>
        </div>
        <div className="summary-section">
          <div className="summary-shipping">
            <div className="row">
              <p className="summary-title">Subtotal</p>
              <p className="summary-price">
                {currencyFormat(totalPrice, "USD", 2)}
              </p>
            </div>
            <ShippingOrder />
          </div>
          <div className="total">
            <span className="total-title">Total</span>
            <div className="total-result">
              <span>{currency}</span>
              <p>{currencyFormat(totalPrice, "USD", 2)}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const shippingDescription =
  '<body class="page-policies default-background text-container"> <p><b><i>How much is shipping?</i></b></p> <p><span style="font-weight:400;">US Orders:&nbsp;<br></span><span style="font-weight:400;">Domestic shipping is free for orders $75 and over, net of any discounts applied. We offer priority and overnight shipping via FedEx for a fee. Unfortunately, we cannot offer free shipping to U.S. territories at this time.</span></p> <p><span style="font-weight:400;">CA Orders:<br></span><span style="font-weight:400;">Shipping is free for orders $120 CAD and over net of any discounts applied. We offer priority and overnight shipping DHL for a fee.</span></p> <p><b><i>What carrier do you use?</i></b></p> <p><span style="font-weight:400;">US Orders:&nbsp;<br></span><span style="font-weight:400;">We partner with USPS and FedEx to get your LIVELY pieces to you.&nbsp;<br></span><span style="font-weight:400;">For orders with free shipping, we partner with USPS Priority.</span></p> <p>CA Orders:<br><span style="font-weight:400;">Orders are shipped via DHL Express.&nbsp;</span></p> <p><b><i>How long will it take for me to receive my LIVELY pieces?</i></b></p> <p><span style="font-weight:400;">US Orders:&nbsp;<br></span><span style="font-weight:400;">Once your order is placed, you’ll receive an email confirming we have received it. For orders placed within the contiguous United States, FedEx and USPS shipments are usually delivered within 7-10 business days from when the order ships. The shipping carrier may experience delays once the package ships. Saturday and Sunday are excluded from FedEx shipping days. Sunday is excluded from USPS shipping days.&nbsp;</span></p> <p><span style="font-weight:400;">Please Note: If you select FedEx 2 day or USPS Express shipping and place your order after 11am EST, you must allow 1 processing day and two full shipping days to receive your order. If you select FedEx Standard Overnight shipping and place your order after 11am EST, you must allow 1 processing day and 1 full shipping day to receive your order. FedEx does not deliver to P.O. Boxes and must be shipped to a physical address.&nbsp;</span></p> <p><span style="font-weight:400;">If your shipment is being delivered outside of the contiguous United States, please allow for additional shipping time. Please note that we cannot guarantee ship time to Hawaii, Alaska, or APO, DPO, and FPO addresses located outside of the United States.</span></p> <p><span style="font-weight:400;">CA Orders:<br></span><span style="font-weight:400;">Delivery times depend on the destination country/location and shipping method selected. An estimated delivery time and cost will be displayed for each option at checkout. Delivery dates quoted at checkout are an estimation only.</span></p> <p><b><i>Do you ship internationally?</i></b></p> <p><span style="font-weight:400;">We currently ship to the United States and Canada. If you live anywhere outside of the United States or Canada, we recommend checking out our collection with Nordstrom, as they do offer international shipping options. Some LIVELY customers also recommend using a freight forwarder, like HopShopGo. Please note that HopShopGo and LIVELY are not directly affiliated. Any customer service inquiries for HopShopGo orders should be directed toward HopShopGo. If you place an order using a forwarder and need your items to ship in one consolidated package, we recommend contacting the forwarder to request that they hold the shipment until all of your items have been packaged together in one shipment if you have any pre-order items.</span></p> <p><span style="font-weight:400;">Additionally, all international sales are considered final as we cannot accept international returns at this time.</span></p> <p><span style="font-weight:400;">If you place an order using a forwarder and have pre-order items, we recommend contacting the forwarder to ensure your items ship in one consolidated package to avoid additional charges.</span></p> <div class="hidden"> <span class="visually-hidden" id="forwarding-external-new-window-message"> Opens external website in a new window. </span> <span class="visually-hidden" id="forwarding-new-window-message"> Opens in a new window. </span> <span class="visually-hidden" id="forwarding-external-message"> Opens external website. </span> <span class="visually-hidden" id="checkout-context-step-one"> Order details - LIVELY - Checkout </span> </div>';

export const ShippingOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal showModal={isOpen} className="shipping-modal-container">
        <div className="shipping-modal">
          <div className="modal-header">
            <h2 className="modal-title">Shipping policy</h2>
            <Image
              src="/assets/icons/x.svg"
              alt="close-icon"
              ariaLabel="close-icon"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: shippingDescription,
            }}
            className="modal-content"
          />
        </div>
      </Modal>
      <div className="row shipping-row">
        <div className="summary-shipping-title">
          Shipping{" "}
          <Image
            src="/assets/icons/question.svg"
            alt="question"
            ariaLabel="shipping_question_icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <p className="summary-shipping-calculated">{shipping}</p>
      </div>
    </>
  );
};
