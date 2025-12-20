import { io } from "socket.io-client";
import { ServerURL } from "./App";

export const socket = io(`${ServerURL}`, {
  withCredentials: true,
});
