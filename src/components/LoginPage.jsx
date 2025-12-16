import "./LoginCards.css";

const LoginPage = () => {
  return (
    <div className="login-ui">
      <h1 className="title">Login</h1>
      <p className="subtitle">Enter your credentials</p>

      <form className="login-form">
        <label>
          Username
          <input type="text" placeholder="Enter username" />
        </label>

        <label>
          Password
          <input type="password" placeholder="Enter password" />
        </label>

        <button type="button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
