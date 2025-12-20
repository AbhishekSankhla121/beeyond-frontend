import { atom } from "jotai";

export const authAtom = atom(undefined);
export const STATUS_OPTIONS = [
  "PICKED_UP",
  "ON_THE_WAY",
  "DELIVERED",
];
export const ServerURL = process.env.REACT_APP_SERVER_URL