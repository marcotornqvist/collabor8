import React from "react";
import Contacts from "./Contacts";
import Projects from "./Projects";

const Menu = () => {
  return (
    <div className="menu">
      <Projects />
      <Contacts />
    </div>
  );
};

export default Menu;
