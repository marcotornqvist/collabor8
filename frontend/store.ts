import { proxy, useSnapshot } from "valtio";

export const authState = proxy({
  accessToken: "",
  isAuth: false,
  loading: true,
});

export const navigationState = proxy({
  menuOpen: false,
});
