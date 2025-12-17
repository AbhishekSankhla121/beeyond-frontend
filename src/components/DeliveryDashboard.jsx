import { useEffect, useState } from "react"
import { socket } from "../socket.js"
import Orders from "./Orders.jsx";
import { useAtomValue } from "jotai";
import { authAtom } from "./atom.js";



export default function DeliveryDashboard () {
     const user =useAtomValue(authAtom)
     const [order, setOrder] = useState([]);

     const [loading, setLoading] = useState(true);

     const fetchMyAssignedOrders = async () => {
      try {
        const order = await fetch(
          "http://localhost:5000/api/v1/delivery/order",
          { credentials: "include" }
        );

        const data = await order.json();
        setOrder(data.data || []);
        
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {   
    fetchMyAssignedOrders();
  }, []);

  useEffect(() => {
    if (!user?._id) return;
    socket.emit("joinDeliveryRoom", user._id);

    socket.on("orderUpdated", (order) => {
      console.log("Customer received update:", order);
      // update state here
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [user]);

  return <>
   {order && <Orders orders={order} user={user} role={"DELIVERY"} status={"UNASSINGED"}/>}
  </>
}


