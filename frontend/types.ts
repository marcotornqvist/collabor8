export interface FileResponse {
  file: string;
  mimetype: string;
  encoding: string;
  url: string;
}

export interface IAuthState {
  accessToken: string;
  isAuth: boolean;
  loading: boolean;
}

export interface INavigationState {
  menuOpen: boolean;
}

export interface IToast {
  id: string;
  message: string;
  duration: number;
}

export interface IToastState {
  toasts: IToast[];
  addToast: (message: string, duration?: number) => void;
  deleteToast: (id: string, duration: number) => void;
}
