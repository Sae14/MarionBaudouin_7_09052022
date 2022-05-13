import React, { useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  //  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  // Useselector redux toolkit pr requêter ds store infos de l'utilisateur ?
  const [user, setUser] = useState("");

  const handleEdit = () => {
    const data = {
      content: editBio ? editBio : user.bio,
    };
    axios.put("http://localhost:3004/users/" + user.id, data).then(() => {
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    axios.delete("http://localhost:3004/users/" + user.id).then(() => {
      localStorage.clear();
      navigate("/signup");
    });
  };

  return (
    <div className="profile-page">
      <header>
        <Logo />
        <Navigation />
      </header>

      <h2>Profil</h2>

      <div className="profile-container">
        <h3>Bienvenue sur votre espace !</h3>

        <div className="infos-container">
          {/* <h4>Votre avatar</h4> */}

          <h4>Votre pseudo</h4>

          <p>{user.pseudo}userpseudo</p>

          <h4>Votre bio</h4>
          {isEditing ? (
            <textarea
              defaultValue={editBio ? editBio : user.bio}
              autoFocus
              onChange={(e) => setEditBio(e.target.value)}
            ></textarea>
          ) : (
            <p>
              {editBio ? editBio : user.bio}Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Aenean eget euismod nisl. Proin
              placerat in felis id vehicula.
            </p>
          )}
          <div className="button-container">
            {isEditing ? (
              <button onClick={() => handleEdit()}>Valider bio</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Modifier bio</button>
            )}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible"
                  )
                ) {
                  handleDelete();
                }
              }}
            >
              Supprimer compte
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
