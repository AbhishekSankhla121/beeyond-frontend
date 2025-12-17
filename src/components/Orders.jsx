import { STATUS_OPTIONS } from "./atom";

export default function Orders({orders,user,role,status}){
  return<>
    <div style={styles.container}>
     {!status && <h2 style={styles.heading}>{role ==="DELIVERY" ?" Update Delivery Status":"Live Order Status Tracking"}</h2>}
      {status && <h2 style={styles.heading}>{"View Unassigned Orders"}</h2>}
      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <div style={styles.row}>
            <strong>Order ID:</strong>
            <span>{order._id}</span>
          </div>

          <div style={styles.row}>
            <strong>Items:</strong>
            <span>{order.items.length}</span>
          </div>

          <div style={styles.row}>
            <strong>Total Amount:</strong>
            <span>₹{order.totalAmount}</span>
          </div>

          <div style={styles.row}>
            <strong>Status:</strong>
            <span

            >
              {order.status}
            </span>
          </div>

          <div style={styles.row}>
            <strong>Assigned:</strong>
            <span>{order.isLocked ? "Yes ✅" : "No ❌"}</span>
          </div>

          <div style={styles.row}>
            <strong>Created:</strong>
            <span>
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          {role === 'DELIVERY' && !status &&<>
                    
               <select
            value={order.status}
          
            style={styles.select}
            disabled={order.status === "DELIVERED"}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <button style={styles.button}>
            Update Status
          </button>
          
          </>
}
  {
     role === 'DELIVERY'&&  status ==="UNASSINGED" &&       <button style={styles.button}>
            Accept order
          </button>
  }
        </div>
      ))}
    </div>
  
  </>
  
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
  },
  card: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
  },
  status: {
    padding: "4px 10px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
  },
  button: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
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
    select: {
    marginTop: "10px",
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};