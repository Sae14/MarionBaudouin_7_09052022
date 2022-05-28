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
  const [myProfile, setMyProfile] = useState([]);
  const [file, setFile] = useState();
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
    const data = new FormData();
    if (file) data.append("image", file);
    data.append("bio", editBio ? editBio : myProfile.bio);

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

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
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
          <h4>Votre adresse email</h4>

          <p>{myProfile.email}</p>

          <div className="img-profile-container">
            {myProfile.image ? (
              <img src={myProfile.image} alt="image du profil"></img>
            ) : (
              <img src="./default-profile-picture.png"></img>
            )}
          </div>
          {isEditing ? (
            <div>
              <label htmlFor="file">Joindre une image : </label>
              <input
                type="file"
                name="file"
                id="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={(e) => handlePicture(e)}
              />
            </div>
          ) : null}

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
              <button onClick={() => handleEdit()}>Valider infos</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Modifier infos</button>
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
