import axios from "axios";
import React, { useState } from "react";
import { dateFormater } from "./Utils";
import { useDispatch } from "react-redux";
import { editPost, deletePost } from "../feature/postSlice";
import PostInteraction from "./PostInteraction";

const Post = ({ post, myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleEdit = () => {
    const data = new FormData();
    if (file) data.append("image", file);
    data.append("content", editContent ? editContent : post.content);

    axios
      .put(
        `http://localhost:${process.env.REACT_APP_PORT}/api/posts/${post.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          editPost([
            res.data.postObject.content,
            res.data.postObject.image,
            post.id,
          ])
        );

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
        `http://localhost:${process.env.REACT_APP_PORT}/api/posts/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(() => {
        setEditContent("");
        dispatch(deletePost(post.id));
      });
  };

  return (
    <div className="shadow-md mb-10 bg-pink rounded-lg p-2 w-full">
      <div className="flex">
        {post.user && post.user.image ? (
          <img
            className="w-14 h-14 mr-2 rounded-2xl border-2 border-grey object-cover"
            src={post.user.image}
            alt="image du profil"
          ></img>
        ) : (
          <img
            className="w-14 h-14 mr-2 rounded-2xl border-2 border-grey object-cover"
            src="./default-profile-picture.png"
            alt="image de profil par défaut"
          ></img>
        )}
        <div>
          <h3 className="font-bold">
            {post.user ? post.user.name : "Compte supprimé"}
          </h3>
          <p className="italic">Posté le {dateFormater(post.createdAt)}</p>
        </div>
      </div>
      {isEditing ? (
        <div className="flex flex-wrap py-2">
          <textarea
            className="w-full h-20 p-1 rounded-md mb-1"
            defaultValue={editContent ? editContent : post.content}
            autoFocus
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          <label htmlFor="file">Joindre une image : </label>
          <input
            className="file:p-1 file:cursor-pointer file:text-sm file:mb-2 file:ml-1 file:rounded-full file:bg-grey file:text-white file:border-2 file:border-white file:border-solid hover:file:border-grey hover:file:bg-white hover:file:text-black"
            type="file"
            name="file"
            id="file"
            accept=".png, .jpg, .jpeg, .gif, .jfif"
            onChange={(e) => handlePicture(e)}
          />
        </div>
      ) : (
        <p className="w-full py-4">
          {editContent ? editContent : post.content}
        </p>
      )}
      {post.image ? (
        <img
          className="border-2 border-grey w-auto rounded-md max-h-45 object-cover  mb-3"
          src={post.image}
          alt="image du post"
        ></img>
      ) : null}

      {myId == post.userId || myRole == "ADMIN" ? (
        <div>
          {isEditing ? (
            <button
              className="text-sm border-solid border-2 text-white bg-grey w-23 h-8 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
              onClick={() => handleEdit()}
            >
              Valider
            </button>
          ) : (
            <button
              className="text-sm border-solid border-2 text-white bg-grey w-23 h-8 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </button>
          )}
          <button
            className="text-sm border-solid border-2 text-white bg-grey w-23 h-8 my-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
            onClick={() => {
              if (
                window.confirm("Voulez-vous vraiment supprimer votre post ?")
              ) {
                handleDelete();
              }
            }}
          >
            Supprimer
          </button>
        </div>
      ) : null}

      <PostInteraction
        post={post}
        myToken={myToken}
        myId={myId}
        myRole={myRole}
      />
    </div>
  );
};

export default Post;
