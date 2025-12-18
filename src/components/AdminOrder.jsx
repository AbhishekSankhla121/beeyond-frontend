import { useEffect, useState } from "react";
import { authAtom } from "./atom";
import { useAtomValue } from "jotai";
import Orders from "./Orders";
  import { socket } from "../socket.js"
        


export default function AdminOrder(params) {
         const [unAssignedOrder, setUnAssignedOrder] = useState([]);
          const user =useAtomValue(authAtom)
         const [loading, setLoading] = useState(true);
        const fetchMyUnAssignedOrders = async () => {
        try {
          const allUnAssignedOrder = await fetch(
            "http://localhost:5000/api/v1/admin/order",
            { credentials: "include" }
          );
  
          const data = await allUnAssignedOrder.json();
          setUnAssignedOrder(data.data || []);
          
        } catch (err) {
          console.error("Failed to fetch orders", err);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {   
      fetchMyUnAssignedOrders();
    }, []);
  
    useEffect(() => {
      if (!user?._id) return;
      socket.emit("joinAdminRoom");
  
      // socket.on("orderUpdated", (order) => {
      //   console.log("admin received update:", order);
      //   // update state here
      // });
      
      socket.on("PlaceOrder", (order) => {
        setUnAssignedOrder((prev) => {
    return [...prev, order.data];
  });
      });
  
      return () => {
        // socket.off("orderUpdated");
        socket.off("PlaceOrder")
      };
    }, [user?._id,unAssignedOrder]);
  console.log("currentdata",unAssignedOrder)
    return <>
    {unAssignedOrder && <Orders orders={unAssignedOrder} role={"ADMIN"} status={"VIEW"} />}
    </>
  }
  
  