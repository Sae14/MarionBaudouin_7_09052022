import React, { useState } from "react";
import { dateFormater } from "../components/Utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../feature/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = ({ myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const myProfile = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="shadow-md bg-pink mx-2 mb-10 rounded-lg p-2 sm:flex sm:flex-col sm:items-center lg:w-3/4 lg:mx-auto xl:w-3/5 2xl:w-2/5">
      <h3 className="pb-6">
        Bienvenue chez vous <span className="font-bold">{myProfile?.name}</span>{" "}
        !
      </h3>
      <p>
        Vous êtes parmi nous depuis le :{" "}
        <span className="font-bold">{dateFormater(myProfile?.createdAt)} </span>
      </p>

      <p>
        Votre adresse email :{" "}
        <span className="font-bold">{myProfile?.email}</span>
      </p>

      <div className="mt-2">
        {myProfile?.image ? (
          <img
            className="border-2 border-grey max-w-full rounded-md max-h-64 object-cover mb-3"
            src={myProfile?.image}
            alt="image du profil"
          ></img>
        ) : (
          <img
            className="border-2 border-grey max-w-full rounded-md max-h-64 object-cover mb-3"
            src="./default-profile-picture.png"
            alt="image de profil par défaut"
          ></img>
        )}
      </div>
      {isEditing ? (
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="file">
            Joindre une image :{" "}
          </label>
          <input
            className="file:p-1 file:cursor-pointer file:text-sm file:mb-2 file:ml-1 file:rounded-full file:bg-grey file:text-white file:border-2 file:border-white file:border-solid hover:file:border-grey hover:file:bg-white hover:file:text-black"
            type="file"
            name="file"
            id="file"
            accept=".png, .jpg, .jpeg, .gif .jfif"
            onChange={(e) => handlePicture(e)}
          />
        </div>
      ) : null}

      <h4 className="font-bold py-2">Votre bio</h4>
      {isEditing ? (
        <textarea
          className="w-full h-20 p-1 rounded-md mb-1"
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

      <div className="border-t-4 border-t-white mt-2">
        {isEditing ? (
          <button
            className="border-solid border-2 text-white bg-grey w-27 h-9 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
            onClick={() => handleEdit()}
          >
            Valider infos
          </button>
        ) : (
          <button
            className="border-solid border-2 text-white bg-grey w-27 h-9 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
            onClick={() => setIsEditing(true)}
          >
            Modifier infos
          </button>
        )}
        <button
          className="border-solid border-2 text-white bg-grey w-27 h-9 my-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
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
      <span className="font-bold">
        {error && "Veuillez avoir une présentation de moins de 280 caractères"}
      </span>
    </div>
  );
};

export default ProfileUpdate;
