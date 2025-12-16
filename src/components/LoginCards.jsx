import "./LoginCards.css";

const LoginCards = () => {
  return (
    <div className="login-ui">
      <h1 className="title">Login Portal</h1>
      <p className="subtitle">Choose your login type</p>

      <div className="cards-container">
        <div className="card">
          <div className="card-icon">👤</div>
          <h3 className="card-title">Customer Login</h3>
          <p className="card-desc">
            Order products and track deliveries
          </p>
        </div>

        <div className="card highlighted">
          <div className="card-icon">🚚</div>
          <h3 className="card-title">Delivery Partner Login</h3>
          <p className="card-desc">
            Manage and complete deliveries
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🛠</div>
          <h3 className="card-title">Admin Login</h3>
          <p className="card-desc">
            Control users and system settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCards;
