import ToastItem from "./ToastItem";
import { toastState } from "store";
import { useSnapshot } from "valtio";

const Toasts = () => {
  const { toasts } = useSnapshot(toastState);

  return (
    <div className="toasts">
      {toasts.map((item) => (
        <ToastItem
          key={item.id}
          id={item.id}
          message={item.message}
          status={item.status}
          duration={item.duration}
        />
      ))}
    </div>
  );
};

export default Toasts;
