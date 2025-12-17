import { useEffect, useState } from "react"
import { socket } from "../socket.js"
import Profile from "./Profile.jsx";
import { useAtomValue } from "jotai";
import { authAtom } from "./atom.js";

export default function CustomerDashboard() {
  const user =useAtomValue(authAtom)

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
       
 {user &&<Profile user={user}/>}

  </>
}
