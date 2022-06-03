import React from "react";
import { NavLink } from "react-router-dom";

const NavigationUnlog = () => {
  return (
    <div>
      <ul className="flex justify-center">
        <NavLink
          to="/signin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="px-3 pb-2 hover:font-bold">Connexion</li>
        </NavLink>
        <NavLink
          to="/signup"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="px-3 pb-2 hover:font-bold">Inscription</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavigationUnlog;
