import { ErrorStatus } from "@/types-enums/enums";
import { useCallback } from "react";
import { useEffect } from "react";
import { toastState } from "store";
import router from "next/router";
import { isEmptyObject } from "utils/helpers";

interface IArgs<T1> {
  data?: T1 | null;
  successMessage?: string;
  error?: string;
  formErrors?: object;
  redirect?: string;
}

const useToast = <T1>({
  data,
  successMessage = "",
  error,
  formErrors = {},
  redirect,
}: IArgs<T1>): void => {
  const addToast = useCallback(() => {
    toastState.addToast(successMessage, ErrorStatus.success);
  }, []);

  useEffect(() => {
    // Add toast with a cleanup if data is returned and there is redirect specified
    if (data && redirect) {
      redirect && router.push(redirect);
      // Add toast when route has started to change
      router.events.on("routeChangeStart", addToast);
    }

    // Add toast if data is returned and there is no redirect specified
    if (data && !redirect) {
      toastState.addToast(successMessage, ErrorStatus.success);
    }

    // Add toast if error occurs without formErrors
    if (error && isEmptyObject(formErrors)) {
      toastState.addToast(error, ErrorStatus.danger);
    }

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", addToast);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);
};

export default useToast;
