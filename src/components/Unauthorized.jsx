import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.icon}>🚫</div>

        {/* Title */}
        <h1 style={styles.title}>Access Denied</h1>

        {/* Message */}
        <p style={styles.message}>
          You don’t have permission to access this page.
        </p>

        <p style={styles.subMessage}>
          Please check your role or login with an authorized account.
        </p>

        {/* Buttons */}
        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1f2933, #111827)",
    fontFamily: "Inter, system-ui, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
  },
  icon: {
    fontSize: "56px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#111827",
  },
  message: {
    fontSize: "15px",
    color: "#374151",
    marginBottom: "6px",
  },
  subMessage: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  primaryBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};
