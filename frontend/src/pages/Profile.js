import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dateFormater } from "../components/Utils";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  // Useselector redux toolkit pr requêter ds store infos de l'utilisateur ?
  const [myProfile, setMyProfile] = useState({});
  const myId = sessionStorage.getItem("myid");
  const myRole = sessionStorage.getItem("myrole");
  const myToken = sessionStorage.getItem("mytoken");

  const getData = () => {
    // let headerstoken = sessionStorage.getItem("mytoken");
    // setHeadersToken(sessionStorage.getItem("mytoken"));
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/api/auth/${myId}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((user) => setMyProfile(user.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    if (!myToken) {
      navigate("/signin");
    }
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
      })
      .catch((error) => console.log(error));
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="profile-page">
      <header>
        <Logo />
        <Navigation />
      </header>

      <h2>Profil</h2>

      <div className="profile-container">
        <h3>Bienvenue chez vous {myProfile.name} !</h3>
        <p>
          Vous êtes parmi nous depuis le {dateFormater(myProfile.createdAt)}
        </p>

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
