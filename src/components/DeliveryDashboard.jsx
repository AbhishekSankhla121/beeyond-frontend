import { useEffect, useState } from "react"
import { socket } from "../socket.js"
import Orders from "./Orders.jsx";
import { useAtomValue } from "jotai";
import { authAtom } from "./atom.js";



export default function DeliveryDashboard () {
     const user =useAtomValue(authAtom)
     const [order, setOrder] = useState([]);
     const [loading, setLoading] = useState(true);
   
    const handleAcceptOrder = async(orderId) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/delivery/order",{
        method: "POST",
        credentials:"include",
           headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({
          id: orderId, 
        }),
      })
      if(!res.ok) return
  
      const data = await res.json()
      const newOrder = order.filter((e)=> e._id !==  data.data._id)
      setOrder(newOrder)
    } catch (error) {
      console.log(error)
    }
    
  };
    

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
   socket.emit("joinAdminRoom");
      socket.on("PlaceOrder", (order) => {
        console.log("order",order)
        setOrder((prev) => {
    return [order.data,...prev];
  });
      });
  

    return () => {
      socket.off("PlaceOrder");
    };
  }, [user]);

  return <>
   {order && <Orders orders={order}  role={"DELIVERY"} status={"UNASSINGED"} acceptOrder={handleAcceptOrder }/>}
  </>
}


