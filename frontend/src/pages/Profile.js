import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ myToken, myId }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  // Useselector redux toolkit pr requêter ds store infos de l'utilisateur ?
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    const getData = () => {
      if (!myToken) {
        navigate("/signin");
      }
      // let headerstoken = sessionStorage.getItem("mytoken");
      // setHeadersToken(sessionStorage.getItem("mytoken"));
      axios
        .get(
          `http://localhost:${process.env.REACT_APP_PORT}/api/auth/${myId}`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        )
        .then((user) => setMyProfile(user.data));
    };
    getData();
  }, []);

  const handleEdit = () => {
    const data = {
      content: editBio ? editBio : myProfile.bio,
    };
    axios
      .put(
        `http://localhost:${process.env.REACT_APP_PORT}/api/auth/${myId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(() => {
        setIsEditing(false);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:${process.env.REACT_APP_PORT}/api/auth/${myId}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(() => {
        sessionStorage.clear();
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
        <h3>
          Bienvenue chez vous {myProfile.name} ! Vous êtes parmi nous depuis le{" "}
          {myProfile.createdAt}
        </h3>

        <div className="infos-container">
          {/* <h4>Votre avatar</h4> */}

          <h4>Votre adresse email</h4>

          <p>{myProfile.email}</p>

          <h4>Votre bio</h4>
          {isEditing ? (
            <textarea
              defaultValue={editBio ? editBio : myProfile.bio}
              autoFocus
              onChange={(e) => setEditBio(e.target.value)}
            ></textarea>
          ) : (
            <p>{editBio ? editBio : myProfile.bio}</p>
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
