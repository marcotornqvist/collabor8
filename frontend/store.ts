import { proxy, useSnapshot } from "valtio";

export const state = proxy({
  accessToken: "",
  isAuth: false,
  loading: true,
});
