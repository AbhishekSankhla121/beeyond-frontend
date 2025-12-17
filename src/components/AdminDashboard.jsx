import { useEffect, useState } from "react";
import { socket } from "../socket";
import Profile from "./Profile";

export default function AdminDashboard() {

 const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchMe = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/v1/me", {
            credentials: "include",
          });
  
          if (!res.ok) throw new Error("Not authenticated");
  
          const data = await res.json();
          setUser(data.data);
          console.log("Delivery:", data);
        } catch (err) {
          console.error("Auth error:", err.message);
        }
      };
  
      fetchMe();
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
   {/* {user &&<Profile user={user}/>} */}
  </>
}