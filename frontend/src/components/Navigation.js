import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const Logout = () => {
    sessionStorage.clear();
  };

  return (
    <div>
      <ul class="flex justify-center">
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li class="px-3 pb-2 hover:font-bold">Accueil</li>
        </NavLink>
        <NavLink
          to="/profile"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li class="px-3 pb-2 hover:font-bold">Profil</li>
        </NavLink>
        <NavLink
          to="/signin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li class="px-3 pb-2 hover:font-bold" onClick={() => Logout()}>
            Déconnexion
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
