import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/admin/order", {
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
  admin dashboard 
  </>
}