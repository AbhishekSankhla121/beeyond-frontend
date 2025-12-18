import { useEffect, useState } from "react"
import { socket } from "../socket.js"
import { useAtomValue } from "jotai";
import { authAtom } from "./atom.js";
import Orders from "./Orders.jsx";

export default function CustomerOrder() {
  const user =useAtomValue(authAtom)
   const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/user/order",
          { credentials: "include" }
        );

        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);
  useEffect(() => {
    if (!user?._id) return;
    socket.emit("joinCustomerRoom", user?._id);

    socket.on("orderUpdated", (order) => {
      console.log("Customer received update:", order);
      // update state here
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [user]);

  return <>

{orders && <Orders orders={orders} role={"CUSTOMER"} />}
  </>
}
