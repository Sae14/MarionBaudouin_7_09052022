import axios from "axios";
import React, { useState } from "react";
import Comment from "../components/Comment";

const PostInteraction = ({ post, myToken, myId, myRole }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [content, setContent] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const checkComments = () => {
    axios
      .get(
        `http://localhost:${process.env.REACT_APP_PORT}/api/comments/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then((res) => setCommentsData(res.data));
    setCommentToggle(true);
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
          console.log(res.data.commentId);
          resetPost();
        });
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
            {commentsData
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((comment) => (
                <Comment
                  key={comment.id}
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
