import axios from "axios";
import React, { useState } from "react";

const Post = ({ post, myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [file, setFile] = useState();

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = new FormData();
    if (file) data.append("image", file);
    data.append("content", editContent ? editContent : post.content);
    // const data = {
    //   content: editContent ? editContent : post.content,
    // };
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
      .then(() => {
        setIsEditing(false);
      });
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = () => {
    axios.delete(
      `http://localhost:${process.env.REACT_APP_PORT}/api/posts/${post.id}`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
  };

  return (
    <div className="post">
      <div className="post-header">
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
      {post.image ? <img src={post.image} alt=""></img> : null}

      <div className="btn-interact-container">
        <button>
          J'aime<span>{/* donnée dynamique de table like</p> */}</span>
        </button>
        <button>
          Commenter<span>{/* donnée dynamique de table com</p> */}</span>
        </button>
      </div>
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
