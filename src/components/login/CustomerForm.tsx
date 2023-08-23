export const CustomerForm = () => {
  return (
    <div className="customer-wrapper form-login-wrapper">
      <h1>New? Sign Up for Rewards!</h1>
      <p className="form-description">
        Life’s sweeter as a member! Create an account to join our super cool
        Rewards Program – that’s an instant ₱50 OFF. Rack up points with every
        purchase - the more you shop, the more you earn!
      </p>
      <button className="form-button">
        <a href="/register">create account</a>
      </button>
      <div className="form-image-wrap"></div>
    </div>
  );
};
