/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useState } from "react";
import PostInteraction from "./PostInteraction";
import { dateFormater } from "./Utils";
import { useDispatch, useSelector } from "react-redux";
import { editPost, deletePost } from "../feature/postSlice";

// post props
const Post = ({ post, myToken, myId, myRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  // const post = useSelector((state) => state.posts.posts.id);

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
        // const dataObject = {
        //   content: data.content,
        //   image: data.image,
        //   id: post.id,
        // };
        // const dataObject = {
        //   content: data.content,
        //   image: res.postImage,
        //   id: post.id,
        // };
        // const dataObject = res.data.newObject;
        // const dataObject = Object.fromEntries(data);
        dispatch(
          // editPost([dataObject.content, dataObject.image.name, post.id])
          // editPost([data.content, res.postImage, post.id])
          // editPost(dataObject)
          // editPost([dataObject.content, dataObject.image, dataObject.id])
          // editPost([res.data.content, res.data.postImage, post.id])
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
