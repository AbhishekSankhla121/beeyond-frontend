import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginCards.css";

const LoginPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const role = state?.role || "CUSTOMER";
  console.log("role",role)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔑 important for cookies/JWT
        body: JSON.stringify({
          email,
          password,
          role, // optional (only if backend needs it)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data|| "Login failed");
      }

      // ✅ success
      console.log("Login success:", data);

      // role-based redirect
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "DELIVERY") navigate("/delivery/dashboard");
      else navigate("/customer/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-ui">
      <h1 className="title">{role} Login</h1>
      <p className="subtitle">Enter your credentials</p>

      <form className="login-form" onSubmit={handleLogin}>
        {error && <p className="error">{error}</p>}

        <label>
          Email
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
