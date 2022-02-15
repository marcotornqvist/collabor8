import { MutableRefObject, useEffect, useRef, useState } from "react";

// Hook
// T - could be any type of HTML element like: HTMLDivElement, HTMLParagraphElement and etc.
// hook returns tuple(array) with type [any, boolean]
function useHasBeenHovered<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = (): void => setValue(true);
  useEffect(
    () => {
      const node: any = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

export default useHasBeenHovered;
