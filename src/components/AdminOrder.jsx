import { useEffect, useState } from "react";
import { authAtom } from "./atom";
import { useAtomValue } from "jotai";
import Orders from "./Orders";

  
        


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
  
    return <>
    {unAssignedOrder && <Orders orders={unAssignedOrder} role={"ADMIN"} status={"VIEW"} />}
    </>
  }
  
  