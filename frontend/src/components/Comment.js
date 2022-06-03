import React, { useState } from "react";
import axios from "axios";
import { dateFormater } from "./Utils";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../feature/commentSlice";

const Comment = ({ comment, myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const dispatch = useDispatch();

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
        dispatch(editComment([data.content, comment.id]));
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:${process.env.REACT_APP_PORT}/api/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(() => dispatch(deleteComment(comment.id)));
  };

  return (
    <div className="shadow-md my-3 bg-white rounded-lg p-2">
      <div className="flex">
        {comment.user.image ? (
          <img
            className="w-14 h-14 mr-2 rounded-2xl border-2 border-grey object-contain"
            src={comment.user.image}
            alt="image du profil"
          ></img>
        ) : (
          <img
            className="w-14 h-14 mr-2 rounded-2xl border-2 border-grey object-contain"
            src="./default-profile-picture.png"
            alt="image de profil par défaut"
          ></img>
        )}
        <div>
          <h3 className="font-bold">{comment.user.name}</h3>
          <p className="italic">Posté le {dateFormater(comment.createdAt)}</p>
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            className="w-full h-20 p-1 rounded-md mb-1"
            defaultValue={editContent ? editContent : comment.content}
            autoFocus
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <p className="py-4">{editContent ? editContent : comment.content}</p>
      )}

      {myId == comment.userId || myRole == "ADMIN" ? (
        <div>
          {isEditing ? (
            <button
              className="text-sm border-solid border-pink border-2 text-white bg-grey w-23 h-8 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-pink hover:text-black rounded-xl"
              onClick={() => handleEdit()}
            >
              Valider
            </button>
          ) : (
            <button
              className="text-sm border-solid border-pink border-2 text-white bg-grey w-23 h-8 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-pink hover:text-black rounded-xl"
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </button>
          )}
          <button
            className="text-sm border-solid border-pink border-2 text-white bg-grey w-23 h-8 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-pink hover:text-black rounded-xl"
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
