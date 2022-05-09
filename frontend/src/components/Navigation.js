import React from "react";
import { NavLink } from "react-router-dom";

const NavigationLogged = () => {
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
          <li>Déconnexion</li>
        </NavLink>
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

export default NavigationLogged;
