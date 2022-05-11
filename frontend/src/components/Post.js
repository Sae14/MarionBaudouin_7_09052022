import axios from "axios";
import React, { useState } from "react";

const Post = ({ post }) => {
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
      author: post.author,
      content: editContent ? editContent : post.content,
      date: post.date,
      updatedDate: Date.now(),
    };
    axios.put("http://localhost:3004/posts/" + post.id, data).then(() => {
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    axios.delete("http://localhost:3004/posts/" + post.id);
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.author}</h3>
        <p>Posté le {dateFormater(post.date)}</p>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : post.content}
          autoFocus
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : post.content}</p>
      )}
      <img src={post.imageurl} alt=""></img>
      <div className="btn-container">
        <button>Aimer</button>
        <button>Commenter</button>
      </div>

      <div className="btn-action-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        )}
        <button
          onClick={() => {
            if (window.confirm("Voulez-vous vraiment supprimer votre post ?")) {
              handleDelete();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Post;
