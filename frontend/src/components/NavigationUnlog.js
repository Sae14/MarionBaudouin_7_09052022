import React from "react";
import { NavLink } from "react-router-dom";

const NavigationUnlog = () => {
  return (
    <div>
      <ul className="flex justify-center">
        <li className="px-3 pb-2 hover:font-bold">
          <NavLink
            to="/signin"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Connexion
          </NavLink>
        </li>

        <li className="px-3 pb-2 hover:font-bold">
          <NavLink
            to="/signup"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Inscription
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavigationUnlog;
