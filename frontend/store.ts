import {
  IAuthState,
  INavigationState,
  IToastState,
  IToast,
} from "@types-interfaces/store";
import { proxy } from "valtio";
import { v4 as uuidv4 } from "uuid";
import { ErrorStatus } from "@types-enums/enums";

export const authState = proxy<IAuthState>({
  accessToken: "",
  isAuth: false,
  loading: true,
});

export const navigationState = proxy<INavigationState>({
  menuOpen: false,
});

export const toastState = proxy<IToastState>({
  toasts: [
    // {
    //   id: "9120391802938102830",
    //   message: "My name is Giorgio Giovanni",
    //   duration: 3500,
    //   status: ErrorStatus.danger,
    // },
  ],
  addToast(message, status, duration = 3500) {
    toastState.toasts.push({
      id: uuidv4(),
      message,
      duration,
      status,
    });
  },
  deleteToast(id, duration) {
    // Removes the toast from the toast state
    const timeoutId = setTimeout(() => {
      const findIndex = toastState.toasts.findIndex(
        (item: IToast) => item.id === id
      );
      findIndex === 0
        ? toastState.toasts.shift()
        : (toastState.toasts = toastState.toasts.splice(findIndex, 1));
    }, duration + 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  },
});
