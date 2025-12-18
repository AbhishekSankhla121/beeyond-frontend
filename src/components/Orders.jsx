import { useState } from "react";
import { STATUS_OPTIONS } from "./atom";

export default function Orders({orders,role,status,acceptOrder,updateOrder}){
    const [options,setOptions] = useState(STATUS_OPTIONS[0])
    const sortedOrders = [...orders].sort(
  (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
);
      const handleChange = (orderId, value) => {
    setOptions((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };
  return<>
    <div style={styles.container}>
     {!status && role !== 'ADMIN' && <h2 style={styles.heading}>{role ==="DELIVERY" ?" Update Delivery Status":"Live Order Status Tracking"}</h2>}
     {role==="ADMIN" &&<h2 style={styles.heading}>{"View all order details BY ADMIN"}</h2> }
      { role !== 'ADMIN' && status && <h2 style={styles.heading}>{"View Unassigned Orders"}</h2>}
      {<h2 style={styles.heading}>{`Total ${orders.length}`}</h2>}
      {sortedOrders.map((order,i) => {
            const currentValue =options[order._id] ?? order.status; 
return <>
<div key={order._id} style={styles.card}>
          <div style={styles.row}>
            <strong>Order ID:</strong>
            <span>{order._id}</span>
          </div>
        { role==="ADMIN" &&<>
              
          <div style={styles.row}>
            <strong>Customer ID:</strong>
            <span>{order.customer}</span>
          </div>
              <div style={styles.row}>
            <strong>DELIVERY ID:</strong>
            <span>{order.deliveryPartner}</span>
          </div>
        </>
         
        }
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
            <button style={styles.role}

            >
              {order.status}
            </button>
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
                  <div style={styles.row}>
            <strong>Updated At:</strong>
            <span>
              {new Date(order.updatedAt).toLocaleString()}
            </span>
          </div>

          {role === 'DELIVERY' && !status &&<>
                    
               <select
            value={currentValue}
            onChange={(e)=>{
             handleChange(order._id, e.target.value)
            }}
            style={styles.select}
            disabled={order.status === "DELIVERED"}
          >
            {STATUS_OPTIONS.map((s,i) => (
              <option key={i} value={s} >
                {s.replaceAll("_", " ")}
              </option>
            ))}
          </select>
       { order.status !== "DELIVERED" &&  <button style={styles.button} onClick={()=>updateOrder({id:order._id,status:currentValue})}  >
            Update Status
          </button>}
       
          
          </>
}
  {
     role === 'DELIVERY'&&  status ==="UNASSINGED" &&    <button style={styles.button} onClick={()=>acceptOrder(order._id)}>
            Accept order
          </button>
  }
      { order.status === "DELIVERED" &&  <button style={styles.button_completed} onClick={()=>updateOrder({id:order._id,status:options})}  >
            Completed
          </button>}
        </div>
</>
        
})}
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
    role: {
    display: "inline-block",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "600",
    borderRadius: "999px",
    background: "#e0e7ff",
    color: "#4338ca",
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
    button_completed: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#0a9628",
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