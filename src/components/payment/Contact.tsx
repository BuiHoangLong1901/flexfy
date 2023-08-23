export const Contact = () => {
  return (
    <div className="payment-contact">
      <div className="payment-contact-header">
        <h2>Contact</h2>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      <div className="payment-contact-content">
        <div className="input-form">
          <input type="text" placeholder="Email" className="input-email" />
        </div>
        <div className="payment-contact-confirm">
          <label htmlFor="checkbox" className="checkbox payment-checkbox">
            <div className="checkbox-div">
              <input type="checkbox" defaultChecked id="checkbox" />
              <span className="check-icon"></span>
            </div>
            <span>
              Email me with new product launches, early accesses, exclusive
              offers and more!
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
