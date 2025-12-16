
import "./LoginCards.css";

const RegisterPage = () => {
  return (
    <div className="login-ui">
      <h1 className="title">Register</h1>
      <p className="subtitle">Create your account</p>

      <form className="login-form">
        <label>
          Name
          <input type="text" placeholder="Enter your name" />
        </label>

        <label>
          Email
          <input type="email" placeholder="Enter your email" />
        </label>

        <label>
          Password
          <input type="password" placeholder="Enter password" />
        </label>

        <label>
          Confirm Password
          <input type="password" placeholder="Confirm password" />
        </label>

        <button type="button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
