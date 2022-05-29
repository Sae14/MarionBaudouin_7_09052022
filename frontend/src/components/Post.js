import axios from "axios";
import React, { useState } from "react";
import { dateFormater } from "./Utils";
import { useDispatch, useSelector } from "react-redux";
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
      .then(() => dispatch(deletePost(post.id)));
  };

  return (
    <div className="post">
      <div className="post-header">
        {post.user.image ? (
          <img src={post.user.image} alt="image du profil"></img>
        ) : (
          <img src="./default-profile-picture.png"></img>
        )}
        <h3>{post.user.name}</h3>
        <p>Posté le {dateFormater(post.createdAt)}</p>
      </div>
      {isEditing ? (
        <div className="update-container">
          <textarea
            defaultValue={editContent ? editContent : post.content}
            autoFocus
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          <label htmlFor="file">Joindre une image : </label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={(e) => handlePicture(e)}
          />
        </div>
      ) : (
        <p>{editContent ? editContent : post.content}</p>
      )}
      {post.image ? <img src={post.image} alt="image du post"></img> : null}

      <PostInteraction
        post={post}
        myToken={myToken}
        myId={myId}
        myRole={myRole}
      />

      {myId == post.userId || myRole == "ADMIN" ? (
        <div className="btn-action-container">
          {isEditing ? (
            <button onClick={() => handleEdit()}>Valider</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Modifier</button>
          )}
          <button
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
    </div>
  );
};

export default Post;
