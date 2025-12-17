export default function Profile({user}){
 return <>
       <div style={styles.card}>
        {/* Avatar */}
        <div style={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <h2 style={styles.name}>{user.name}</h2>

        {/* Email */}
        <p style={styles.email}>{user.email}</p>

        {/* Role badge */}
        <span style={styles.role}>{user.role}</span>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Info rows */}
        <div style={styles.infoRow}>
          <span>Status</span>
          <span style={{
            ...styles.status,
            color: user.isActive ? "#22c55e" : "#ef4444"
          }}>
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div style={styles.infoRow}>
          <span>Joined</span>
          <span>{new Date(user.createdAt).toDateString()}</span>
        </div>
      </div>
   
 </>
}


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  card: {
    width: "360px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "18px",
    padding: "24px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    fontSize: "36px",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 12px",
  },
  name: {
    margin: "0",
    fontSize: "22px",
    fontWeight: "600",
  },
  email: {
    margin: "4px 0 10px",
    fontSize: "14px",
    color: "#6b7280",
  },
  role: {
    display: "inline-block",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "600",
    borderRadius: "999px",
    background: "#e0e7ff",
    color: "#4338ca",
  },
  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "16px 0",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "8px",
    color: "#374151",
  },
  status: {
    fontWeight: "600",
  },
};