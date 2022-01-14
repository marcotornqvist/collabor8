import { useState } from "react";
import { motion } from "framer-motion";
import NavList from "./NavList";

// Settings Navigation, this component shall have a dropdown with all the links

const Navigation = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="settings-navigation">
        <button onClick={() => setShow(!show)}>Show Menu</button>
        {show && (
          <motion.nav className="dropdown">
            <NavList />
          </motion.nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
