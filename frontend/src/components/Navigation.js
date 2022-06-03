import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome, IoMdPerson, IoMdLogOut } from "react-icons/io";

const Navigation = () => {
  const Logout = () => {
    sessionStorage.clear();
  };

  return (
    <div>
      <ul className="flex justify-center">
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li className="px-3 pb-2 hover:font-bold">
            <IoMdHome />
            Accueil
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="px-3 pb-2 hover:font-bold">
            <IoMdPerson />
            Profil
          </li>
        </NavLink>
        <NavLink
          to="/signin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className="px-3 pb-2 hover:font-bold" onClick={() => Logout()}>
            <IoMdLogOut />
            Déconnexion
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
