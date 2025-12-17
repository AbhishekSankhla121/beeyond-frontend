
import { Link, useLocation } from "react-router-dom";
import "./LoginCards.css";
const RegisterPage = () => {
    const { state } = useLocation();
  const role = state?.role || "CUSTOMER";
   console.log("role",role)
  return (
    <div className="login-ui">
      <h1 className="title">{role} Register</h1>
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
        <Link
            to={'/login'}
            className="card-link"
            state={{
          role: role,
          }}
          type="submit">
          {"back to login"}
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
