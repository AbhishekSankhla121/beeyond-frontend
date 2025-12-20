import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useAtom } from "jotai";
import { authAtom,ServerURL } from "./atom";



export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [user, setUser] = useAtom(authAtom);
 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${ServerURL}/api/v1/admin/stats`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch admin stats");
        }

        const data = await res.json();
        setStats(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
   useEffect(() => {
     if (!user?._id) return;
       socket.emit("joinAdminRoom");
  
        socket.on("orderUpdated", (order) => {
          console.log("Admins received update:", order);
          // update state here
        });
    
        return () => {
          socket.off("orderUpdated");
        };
      }, []);

  return <>
   {stats &&

    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>

      {/* Top Stats */}
      <div style={styles.cardGrid}>
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Live Orders" value={stats.liveOrders} />
        <StatCard title="Customers" value={stats.totalCustomers} />
        <StatCard title="Delivery Partners" value={stats.totalDeliveryPartners} />
      </div>

      {/* Orders by Status */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Orders by Status</h2>

        <div style={styles.statusGrid}>
          {stats.ordersByStatus.map((item) => (
            <div key={item._id} style={styles.statusCard}>
              <span style={styles.statusLabel}>{item._id}</span>
              <span style={styles.statusCount}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
   }
  </>
}


/* ---------- Reusable Card ---------- */
function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  );
}

/* ---------- Inline Styles ---------- */
const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "24px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },
  cardValue: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#111827",
  },
  section: {
    marginTop: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  statusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  statusCard: {
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e5e7eb",
  },
  statusLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  statusCount: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2563eb",
  },
  loading: {
    padding: "24px",
    fontSize: "16px",
  },
  error: {
    padding: "24px",
    color: "red",
  },
};