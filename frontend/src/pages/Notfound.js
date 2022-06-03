import React from "react";
import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="bg-pink shadow-md m-2 p-2 rounded-lg h-80 flex flex-col items-center pt-20 xl:w-2/3 xl:mx-auto">
      <h2 className="font-bold text-2xl">Erreur 404</h2>
      <NavLink to="/">
        <button className="border-solid border-2 text-white bg-grey w-27 h-9 my-7 mx-auto cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl">
          Retour à l'accueil
        </button>
      </NavLink>
    </div>
  );
};

export default Notfound;
