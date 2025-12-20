import { useEffect, useState } from "react"
import { socket } from "../socket.js"
import { useAtomValue } from "jotai";
import { authAtom } from "./atom.js";
import Orders from "./Orders.jsx";
import { ServerURL } from "./atom";


export default function CustomerOrder() {
  const user =useAtomValue(authAtom)
   const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await fetch(
          `${ServerURL}/api/v1/user/order`,
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
    console.log("id",user._id)
    socket.on("orderUpdated", (order) => {
       console.log("order",order)
      setOrders((prev) =>
    prev.map((e) =>
      e._id === order.data._id
        ? { ...e, ...order.data }
        : e
    )
  );
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [user._id]);

  console.log("current",orders)
  return <>
{orders && <Orders orders={orders} role={"CUSTOMER"} />}
  </>
}
