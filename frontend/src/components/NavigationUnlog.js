import React from "react";
import { NavLink } from "react-router-dom";

const NavigationUnlog = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink
          to="/signin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Connexion</li>
        </NavLink>
        <NavLink
          to="/signup"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Inscription</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavigationUnlog;
