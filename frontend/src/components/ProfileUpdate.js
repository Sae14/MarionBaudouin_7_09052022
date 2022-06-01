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
    <div class="bg-pink mx-2 mb-10 rounded-lg p-2 lg:w-3/4 lg:mx-auto xl:w-3/5 2xl:w-2/5">
      <div class="mx-auto w-full">
        <h3 class="pb-6">
          Bienvenue chez vous <span class="font-bold">{myProfile?.name}</span> !
        </h3>
        <p>
          Vous êtes parmi nous depuis le :{" "}
          <span class="font-bold">{dateFormater(myProfile?.createdAt)} </span>
        </p>

        <p>
          Votre adresse email :{" "}
          <span class="font-bold">{myProfile?.email}</span>
        </p>

        <div class="mt-2">
          {myProfile?.image ? (
            <img
              class="max-w-full rounded-md max-h-64 object-cover mb-3"
              src={myProfile?.image}
              alt="image du profil"
            ></img>
          ) : (
            <img
              class="max-w-full rounded-md max-h-64 object-cover mb-3"
              src="./default-profile-picture.png"
            ></img>
          )}
        </div>
        {isEditing ? (
          <div>
            <label class="font-bold" htmlFor="file">
              Joindre une image :{" "}
            </label>
            <input
              class="text-sm"
              type="file"
              name="file"
              id="file"
              accept=".png, .jpg, .jpeg, .gif .jfif"
              onChange={(e) => handlePicture(e)}
            />
          </div>
        ) : null}

        <h4 class="font-bold py-2">Votre bio</h4>
        {isEditing ? (
          <textarea
            class="w-full h-20 p-1 rounded-md mb-1"
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

        <div class="border-t-4 border-t-white mt-2">
          {isEditing ? (
            <button
              class="text-white bg-grey w-27 h-9 my-2 mr-2 cursor-pointer p-1 hover:bg-white hover:text-black rounded-xl"
              onClick={() => handleEdit()}
            >
              Valider infos
            </button>
          ) : (
            <button
              class="text-white bg-grey w-27 h-9 my-2 mr-2 cursor-pointer p-1 hover:bg-white hover:text-black rounded-xl"
              onClick={() => setIsEditing(true)}
            >
              Modifier infos
            </button>
          )}
          <button
            class="text-white bg-grey w-27 h-9 my-2 cursor-pointer p-1 hover:bg-white hover:text-black rounded-xl"
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
        <span class="font-bold">
          {error &&
            "Veuillez avoir une présentation de moins de 280 caractères"}
        </span>
      </div>
    </div>
  );
};

export default ProfileUpdate;
