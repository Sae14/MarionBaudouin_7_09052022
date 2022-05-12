import React, { useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Profile = () => {
  const [bio, setBio] = useState("");
  const [pseudo, setPseudo] = useState("");

  return (
    <div className="profile-page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <h2>Profil</h2>
      <div className="profile-container">
        <h3>Bienvenue sur votre espace !</h3>
        <h4>Votre pseudo</h4>
        <p>Lorem ipsum dolor</p>
        <h4>Votre bio</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          ab.
        </p>
      </div>
      <button>Modifier mes infos</button>
      <button>Supprimer mon compte</button>
      <Footer />
    </div>
  );
};

export default Profile;
