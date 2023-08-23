export const ContactUser = () => {
  return (
    <div className="payment-contact">
      <div className="payment-contact-header">
        <h2>Contact</h2>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      <div className="payment-contact-content">
        <div className="user-info">
          <div className="user-avatar">
            <img src="/assets/icons/user-1.svg" alt="user" />
          </div>
          <div className="user-content">
            <p>Name Account (Email)</p>
            <a href="/login" aria-label="btn-logout">
              Log out
            </a>
          </div>
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
