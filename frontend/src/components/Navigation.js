import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const Logout = () => {
    localStorage.clear();
  };

  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Accueil</li>
        </NavLink>
        <NavLink
          to="/profile"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Profil</li>
        </NavLink>
        <NavLink
          to="/signin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li onClick={() => Logout()}>Déconnexion</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
