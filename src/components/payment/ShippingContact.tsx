export const ShippingContact = () => {
  return (
    <div className="payment-contact shipping-contact">
      <div className="payment-contact-header">
        <h2>Shipping address</h2>
      </div>
      <div className="payment-contact-content">
        <div className="shipping-content">
          <div className="shipping-content-wrapper">
            <div className="shipping-content-info">
              <h6 className="shipping-content-label">Contact</h6>
              <span className="shipping-content-session">mail</span>
            </div>
            <a className="shipping-content-change" href="/payment">
              Change
            </a>
          </div>
          <div className="shipping-content-wrapper">
            <div className="shipping-content-info">
              <h6 className="shipping-content-label">Ship to</h6>
              <span className="shipping-content-session">
                Address information
              </span>
            </div>
            <a className="shipping-content-change" href="/payment">
              Change
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
