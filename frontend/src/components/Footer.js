import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full m-0 bg-red border-t-grey border-t-2 p-2 flex flex-col items-center">
      <h2>
        Suivez-nous sur les réseaux. <br /> Votre espace, votre entreprise !
      </h2>
      <ul className="flex mt-4">
        <li>
          <FaLinkedin className="w-10 h-7 mx-2" />
        </li>
        <li>
          <FaFacebook className="w-10 h-7 mx-2" />
        </li>
        <li>
          <FaInstagram className="w-10 h-7 mx-2" />
        </li>
        <li>
          <FaTwitter className="w-10 h-7 mx-2" />
        </li>
      </ul>

      <img
        className="h-40"
        src="./icon-left-font-monochrome-white.png"
        alt="logo groupomania"
      ></img>
    </footer>
  );
};

export default Footer;
