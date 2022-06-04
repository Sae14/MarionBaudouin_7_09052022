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
        <li className="px-3 pb-2 hover:font-bold">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <IoMdHome className="mx-auto h-5 w-5" />
            Accueil
          </NavLink>
        </li>

        <li className="px-3 pb-2 hover:font-bold">
          <NavLink
            to="/profile"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <IoMdPerson className="mx-auto h-5 w-5" />
            Profil
          </NavLink>
        </li>

        <li className="px-3 pb-2 hover:font-bold" onClick={() => Logout()}>
          <NavLink
            to="/signin"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <IoMdLogOut className="mx-auto h-5 w-5" />
            Déconnexion
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
