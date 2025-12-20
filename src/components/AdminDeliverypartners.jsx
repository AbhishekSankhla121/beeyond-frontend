import { useEffect, useState } from "react";
import { ServerURL } from "./atom";

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(
          `${ServerURL}/api/v1/admin/get-partner`,
          { credentials: "include" }
        );

        const data = await res.json();
        setPartners(data.data || []);
      } catch (err) {
        console.error("Failed to fetch delivery partners", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) return <p style={styles.loading}>Loading delivery partners...</p>;

  if (partners.length === 0)
    return <p style={styles.empty}>No delivery partners found</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚚 Delivery Partners</h2>

      <div style={styles.table}>
        <div style={{ ...styles.row, ...styles.header }}>
          <span>Name</span>
          <span>Email</span>
          <span>Status</span>
          <span>Joined</span>
        </div>

        {partners.map((p) => (
          <div key={p._id} style={styles.row}>
            <span style={styles.name}>{p.name}</span>
            <span>{p.email}</span>

            <span
              style={{
                ...styles.status,
                backgroundColor: p.isActive ? "#16a34a" : "#dc2626",
              }}
            >
              {p.isActive ? "Active" : "Inactive"}
            </span>

            <span>
              {new Date(p.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1.5fr 2fr 1fr 1fr",
    padding: "12px 16px",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  header: {
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "13px",
  },
  name: {
    fontWeight: "600",
  },
  status: {
    padding: "4px 10px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px",
    textAlign: "center",
    width: "fit-content",
  },
  loading: {
    textAlign: "center",
    marginTop: "40px",
  },
  empty: {
    textAlign: "center",
    marginTop: "40px",
    color: "#555",
  },
};
