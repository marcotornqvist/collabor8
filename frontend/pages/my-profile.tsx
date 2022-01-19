import { useEffect, useRef, useState } from "react";
import("scroll-behavior-polyfill");

const MyProfile = () => {
  const [toggle, setToggle] = useState(false);

  const activeRef: any = useRef<HTMLLIElement>(null);
  const listRef: any = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      const x: number = activeRef.current.offsetLeft;
      listRef.current.scroll({ left: x, behavior: "smooth" });
    }
  }, [activeRef.current]);

  return (
    <div className="my-profile-page">
      <div className="container">
        <div className="box" ref={listRef}>
          <div className="profile" ref={toggle ? null : activeRef}>
            Profile
          </div>
          <div className="settings" ref={toggle ? activeRef : null}>
            Settings
          </div>
          <button onClick={() => setToggle(!toggle)}>Toggle</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
