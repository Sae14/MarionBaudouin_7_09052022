import React, { useState } from "react";
import { dateFormater } from "../components/Utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../feature/userSlice";

const ProfileUpdate = ({ myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const myProfile = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editBio.length > 280) {
      setError(true);
    } else {
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
        .then((res) => {
          dispatch(
            editUser([res.data.userObject.bio, res.data.userObject.image])
          );
          setError(false);
          setIsEditing(false);
        })
        .catch((error) => console.log(error));
    }
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
    <div className="profile-container">
      <h3>Bienvenue chez vous {myProfile?.name} !</h3>
      <p>Vous êtes parmi nous depuis le {dateFormater(myProfile?.createdAt)}</p>

      <div className="infos-container">
        <h4>Votre adresse email</h4>

        <p>{myProfile?.email}</p>

        <div className="img-profile-container">
          {myProfile?.image ? (
            <img src={myProfile?.image} alt="image du profil"></img>
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
            style={{
              border: error ? "2px solid red" : "2px solid #4E5166",
            }}
            defaultValue={editBio ? editBio : myProfile?.bio}
            autoFocus
            onChange={(e) => setEditBio(e.target.value)}
          ></textarea>
        ) : (
          <p>{editBio ? editBio : myProfile?.bio}</p>
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
        <span className="error-container">
          {error &&
            "Veuillez avoir une présentation de moins de 280 caractères"}
        </span>
      </div>
    </div>
  );
};

export default ProfileUpdate;
