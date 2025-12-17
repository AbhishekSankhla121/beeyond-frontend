import { atom } from "jotai";

export const authAtom = atom(undefined);
export const STATUS_OPTIONS = [
  "PICKED_UP",
  "ON_THE_WAY",
  "DELIVERED",
];