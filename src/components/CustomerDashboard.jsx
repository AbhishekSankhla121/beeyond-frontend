import { useEffect, useState } from "react"
import { socket } from "../socket.js"

const customerId = '6940f1651dc9d0756a92cfa3'
 
export default function CustomerDashboard(){
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data.user);
        console.log("Admin:", data.user);
      } catch (err) {
        console.error("Auth error:", err.message);
      }
    };

    fetchMe();
  }, []);
  useEffect(() => {
     socket.emit("joinCustomerRoom", customerId);

      socket.on("orderUpdated", (order) => {
        console.log("Customer received update:", order);
        // update state here
      });
  
      return () => {
        socket.off("orderUpdated");
      };
    }, [customerId]);
  
  return<>
  customer
  </>
}