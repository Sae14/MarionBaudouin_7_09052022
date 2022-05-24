import React, { useState } from "react";
import axios from "axios";

const Comment = ({ comment, myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

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
    const data = {
      content: editContent ? editContent : comment.content,
    };

    axios
      .put(
        `http://localhost:${process.env.REACT_APP_PORT}/api/comments/${comment.id}`,
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
    axios.delete(
      `http://localhost:${process.env.REACT_APP_PORT}/api/comments/${comment.id}`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <h3>{comment.user.name}</h3>
        <p>Posté le {dateFormater(comment.createdAt)}</p>
      </div>

      {isEditing ? (
        <div className="update-container">
          <textarea
            defaultValue={editContent ? editContent : comment.content}
            autoFocus
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <p>{editContent ? editContent : comment.content}</p>
      )}

      {myId == comment.userId || myRole == "ADMIN" ? (
        <div className="btn-action-container">
          {isEditing ? (
            <button onClick={() => handleEdit()}>Valider</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Modifier</button>
          )}
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Voulez-vous vraiment supprimer votre commentaire ?"
                )
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

export default Comment;
