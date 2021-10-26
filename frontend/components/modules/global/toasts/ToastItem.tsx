import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toastState } from "store";
import { IToast } from "@types-interfaces/store";

const ToastItem = ({ id, message, status, duration = 3500 }: IToast) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setIsBrowser(true);

    if (!duration || !show) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, show, duration]);

  useEffect(() => {
    toastState.deleteToast(id, duration);
  }, [show]);

  if (isBrowser) {
    return createPortal(
      <AnimatePresence>
        {show && (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            className={`toast ${status !== "default" && status}`}
          >
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>,
      document.getElementById("toasts-portal")!
    );
  } else {
    return null;
  }
};

export default ToastItem;
