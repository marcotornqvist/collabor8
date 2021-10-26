import { toastState } from "store";

const deleteToast = (id: number, toasts: any) => {
  const timeoutId = setTimeout(() => {
    toastState.toasts = toasts.filter((item: any) => item.id !== id);
  }, 3000);

  return () => {
    clearTimeout(timeoutId);
  };
};

export default deleteToast;
