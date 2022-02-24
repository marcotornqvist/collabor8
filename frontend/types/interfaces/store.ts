import { ErrorStatus } from "@/types-enums/enums";

export interface IAuthState {
  accessToken: string;
  isAuth: boolean;
  loading: boolean;
}

export interface ILayoutState {
  menuOpen: boolean;
  slide: boolean;
}

export interface IToast {
  id: string;
  message: string;
  status: ErrorStatus;
  duration?: number;
}

export interface IToastState {
  toasts: IToast[];
  addToast: (message: string, status: ErrorStatus, duration?: number) => void;
  deleteToast: (id: string, duration: number) => void;
}
