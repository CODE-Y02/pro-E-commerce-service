import { atom } from "recoil";
import { localStorageEffect } from "./utils";

export const userState = atom({
  key: "userState",
  default: {
    name: "",
    id: "fhgfhgfhfhgffh",
    role: "",
  },
  effects: [localStorageEffect("user_state")],
});

export default userState;
