import ToastItem from "./ToastItem";
import { toastState } from "store";
import { subscribe, useSnapshot } from "valtio";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const Toasts = () => {
  const { toasts } = useSnapshot(toastState);

  // const addToast = () => {
  //   toastState.toasts.push({
  //     id: uuidv4(),
  //     message: "My name is Giorgio Giovanni 2",
  //     duration: 8000,
  //   });
  // };

  return (
    <div className="toasts">
      {toasts.map((item) => (
        <h3 key={item.id}>{item.id}</h3>
      ))}
      {toasts.map((item) => (
        <ToastItem
          key={item.id}
          id={item.id}
          message={item.message}
          duration={item.duration}
        />
      ))}
      <button onClick={() => toastState.addToast("moi")}>Add Toast</button>
    </div>
  );
};

export default Toasts;
