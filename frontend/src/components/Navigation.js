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
        <li className="px-3 pb-2 hover:font-bold flex flex-col items-center">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <IoMdHome />
            Accueil
          </NavLink>
        </li>

        <li className="px-3 pb-2 hover:font-bold flex flex-col items-center">
          <NavLink
            to="/profile"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <IoMdPerson />
            Profil
          </NavLink>
        </li>

        <li
          className="px-3 pb-2 hover:font-bold flex flex-col items-center"
          onClick={() => Logout()}
        >
          <NavLink
            to="/signin"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <IoMdLogOut />
            Déconnexion
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
