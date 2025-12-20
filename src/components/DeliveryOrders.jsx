import { useEffect, useState } from "react";
import Orders from "./Orders";
import { ServerURL } from "./atom";



  
export default function DeliveryOrders(){
       const [unAssignedOrder, setUnAssignedOrder] = useState([]);
       const [loading, setLoading] = useState(true);
      
       const handleUpdate = async(msg) => {
       try {
      const res = await fetch(`${ServerURL}/api/v1/delivery/order`,{
        method: "PATCH",
        credentials:"include",
           headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify(msg),
      })
      if(!res.ok) return
  
      const data = await res.json()
      const newData = unAssignedOrder.map((order) => {
  if (order._id === data.data._id) {
    return {
      ...order,
      status: data.data.status,
    };
  }
  return order;
});
setUnAssignedOrder(newData)
console.log("new data",newData)
     console.log("update Data",data)
    } catch (error) {
      console.log(error)
    }
  };

       const fetchMyUnAssignedOrders = async () => {
      try {
        const allUnAssignedOrder = await fetch(
          `${ServerURL}/api/v1/delivery/me`,
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
  {unAssignedOrder && <Orders orders={unAssignedOrder} role={"DELIVERY"} updateOrder={ handleUpdate} />}
  </>
}

