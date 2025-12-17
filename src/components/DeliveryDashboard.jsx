import { useEffect } from "react"
import { socket } from "../socket.js"

const userId = '6940f3827b203b2a5ce58b3c'

export default function DeliveryDashboard () {
  useEffect(() => {
    socket.emit("joinDeliveryRoom", userId);

    socket.on("orderUpdated", (order) => {
      console.log("Customer received update:", order);
      // update state here
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [userId]);

  return <>
  <p>deliver dash board </p>
  </>
}