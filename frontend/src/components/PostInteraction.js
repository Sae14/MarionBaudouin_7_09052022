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
  const [likeToggle, setLikeToggle] = useState(0);
  const [error, setError] = useState(false);

  const data = {
    postId: post.id,
  };

  const handleLike = () => {
    axios
      .put(`http://localhost:${process.env.REACT_APP_PORT}/api/likes`, data, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setLikeToggle(res.data.number);
        // dispatch(editComment([data.content, comment.id]));
      })
      .catch((error) => console.log(error));
  };

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
      if (content.length > 280) {
        setError(true);
      } else {
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
            setError(false);
          })
          .catch((error) => console.log(error));
      }
    } else {
      alert("Veuillez ajouter un message");
    }
  };

  const resetPost = () => {
    setContent("");
  };

  return (
    <div className="border-t-4 border-t-white">
      {likeToggle == 0 ? (
        <button
          className="border-solid border-2 text-white bg-grey w-24 h-9 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
          onClick={() => handleLike()}
        >
          J'aime
        </button>
      ) : (
        <button
          className="border-solid border-2 border-grey bg-white text-black w-24 h-9 my-2 mr-2 cursor-pointer p-1 rounded-xl"
          onClick={() => handleLike()}
        >
          J'aime
        </button>
      )}
      <button
        className="border-solid border-2 text-white bg-grey w-24 h-9 my-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
        onClick={() => checkComments()}
      >
        Commenter
      </button>

      {commentToggle ? (
        <div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea
                className="w-full h-20 p-1 rounded-md mb-1"
                style={{
                  border: error ? "2px solid red" : "2px solid #4E5166",
                }}
                placeholder="Réagissez à ce post"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>

              <input
                className="border-solid border-2 text-white bg-grey w-24 h-9 my-2 cursor-pointer mr-2 p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
                type="submit"
                value="Publier"
              />
              {content ? (
                <button
                  className="text-sm border-solid border-2 text-white bg-grey w-23 h-8 my-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
                  onClick={resetPost}
                >
                  Réinitialiser
                </button>
              ) : null}
              <span className="font-bold">
                {error &&
                  "Veuillez envoyer un commentaire de moins de 280 caractères"}
              </span>
            </form>
          </div>
          <section>
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
          <div className="border-t-4 border-t-white">
            <button
              className="border-solid border-2 text-white bg-grey w-24 h-9 my-7 mx-auto cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
              onClick={() => setCommentToggle(false)}
            >
              Fermer le fil
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostInteraction;
