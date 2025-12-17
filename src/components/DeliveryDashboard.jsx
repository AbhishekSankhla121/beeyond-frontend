import { useEffect, useState } from "react"
import { socket } from "../socket.js"
import Profile from "./Profile.jsx";

const userId = '6940f3827b203b2a5ce58b3c'

export default function DeliveryDashboard () {
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
    socket.emit("joinDeliveryRoom", userId);

    socket.on("orderUpdated", (order) => {
      console.log("Customer received update:", order);
      // update state here
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [user]);

  return <>
   {/* {user &&<Profile user={user}/>} */}
  </>
}