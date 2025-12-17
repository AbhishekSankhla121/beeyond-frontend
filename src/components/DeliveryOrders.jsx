import { useEffect, useState } from "react";
import Orders from "./Orders";
import { authAtom } from "./atom";
import { useAtomValue } from "jotai";


export default function DeliveryOrders(){
       const [unAssignedOrder, setUnAssignedOrder] = useState([]);
        const user =useAtomValue(authAtom)
       const [loading, setLoading] = useState(true);
       const fetchMyUnAssignedOrders = async () => {
      try {
        const allUnAssignedOrder = await fetch(
          "http://localhost:5000/api/v1/delivery/me",
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
  {unAssignedOrder && <Orders orders={unAssignedOrder} user={user} role={"DELIVERY"} />}
  </>
}

