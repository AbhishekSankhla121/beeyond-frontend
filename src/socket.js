import { io } from "socket.io-client";
import { ServerURL } from "./components/atom";

export const socket = io(`${ServerURL}`, {
  withCredentials: true,
});
