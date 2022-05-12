import React from "react";
import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="notfound-container">
      <h2>Erreur 404</h2>
      <NavLink to="/">
        <h3>Retour à l'accueil</h3>
      </NavLink>
    </div>
  );
};

export default Notfound;
