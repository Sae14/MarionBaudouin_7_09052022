import axios from "axios";
import React, { useState } from "react";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsData, addComment } from "../feature/commentSlice";

const PostInteraction = ({ post, myToken, myId, myRole }) => {
  const dispatch = useDispatch();
  const commentsData = useSelector((state) => state.comments.comment);
  const [content, setContent] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const checkComments = () => {
    setCommentToggle(true);
    axios
      .get(
        `http://localhost:${process.env.REACT_APP_PORT}/api/comments/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(setCommentsData(res.data));
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content) {
      const data = {
        content,
        postId: post.id,
      };

      axios
        .post(
          `http://localhost:${process.env.REACT_APP_PORT}/api/comments`,
          data,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(addComment(res.data.comobject));
          resetPost();
        })
        .catch((error) => console.log(error));
    } else {
      alert("Veuillez ajouter un message");
    }
  };

  const resetPost = () => {
    setContent("");
  };

  return (
    <div className="btn-interact-container">
      <button>
        J'aime<span>{/* donnée dynamique de table like</p> */}</span>
      </button>
      <button onClick={() => checkComments()}>
        Commenter<span>{/* donnée dynamique de table like</p> */}</span>
      </button>

      {commentToggle ? (
        <div className="comments-container">
          <div className="comment-creation-container">
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea
                placeholder="Réagissez à ce post"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
              {content ? (
                <button onClick={resetPost}>Réinitialiser</button>
              ) : null}
              <input type="submit" value="Publier" />
            </form>
          </div>
          <section className="comment-list-container">
            {commentsData?.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                myToken={myToken}
                myId={myId}
                myRole={myRole}
              />
            ))}
          </section>
          <button onClick={() => setCommentToggle(false)}>Fermer le fil</button>
        </div>
      ) : null}
    </div>
  );
};

export default PostInteraction;
