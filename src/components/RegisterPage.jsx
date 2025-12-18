import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginCards.css";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const role = state?.role || "CUSTOMER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        if (!data?.data) return;

        if (data.data.role === "ADMIN") navigate("/admin/dashboard");
        else if (data.data.role === "DELIVERY") navigate("/delivery/dashboard");
        else navigate("/customer/dashboard");
      } catch (err) {
        console.log(err);
      }
    };

    fetchMe();
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (!data.user && data.success) return;

      if (data.user.role === "ADMIN") navigate("/admin/dashboard");
      else if (data.user.role === "DELIVERY")
        navigate("/delivery/dashboard");
      else navigate("/customer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-ui">
      <h1 className="title">{role} Register</h1>
      <p className="subtitle">Create your account</p>

      <form className="login-form" onSubmit={handleRegister}>
        {error && <p className="error">{error}</p>}

        <label>
          Name
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <Link
          to="/login"
          className="card-link"
          state={{ role }}
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
