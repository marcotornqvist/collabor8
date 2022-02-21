import { useEffect, useState } from "react";
import { Skeleton } from "types/types";

// Sleep determines how long the skeleton should be visible at the minimum
const useSkeleton = (sleep = 500): Skeleton => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Makes sure that skeleton is active at least for the sleep duration, to prevent skeleton flicker
  useEffect(() => {
    if (showSkeleton) {
      let timer = setTimeout(() => {
        setShowSkeleton(false);
      }, sleep);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSkeleton]);

  return {
    showSkeleton,
    setShowSkeleton,
  };
};

export default useSkeleton;
