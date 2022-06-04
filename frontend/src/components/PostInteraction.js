import axios from "axios";
import React, { useState } from "react";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../feature/commentSlice";
import { addLike, deleteLike } from "../feature/likeSlice";
import { IoMdThumbsUp } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

const PostInteraction = ({ post, myToken, myId, myRole }) => {
  const dispatch = useDispatch();
  const commentsData = useSelector((state) => state.comments.comment);
  const likesData = useSelector((state) => state.likes.like);
  const [content, setContent] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [error, setError] = useState(false);

  const checkComments = () => {
    setCommentToggle(true);
  };

  const data = {
    postId: post.id,
  };

  const handleLike = () => {
    const like = likesData?.find(
      (like) => like.postId == post.id && like.userId == myId
    );

    axios
      .put(`http://localhost:${process.env.REACT_APP_PORT}/api/likes`, data, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        if (res.data.number == 1) {
          dispatch(addLike(res.data.likeobject));
        } else if (res.data.number == 0) {
          dispatch(deleteLike(like.id));
        }
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
    <div className="  border-t-4 border-t-white">
      <div className="flex">
        <button
          className="flex  bg-grey border-solid border-2 text-white  w-29 h-9 my-2 mr-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
          onClick={() => handleLike()}
        >
          J'aime
          {likesData?.find(
            (like) => like.postId == post.id && like.userId == myId
          ) ? (
            <IoMdThumbsUp className="ml-2 w-19 h-6" />
          ) : (
            <BiLike className="ml-2 w-19 h-6" />
          )}
          <span className="font-bold pl-2">
            {likesData?.filter((like) => like.postId == post.id).length}
          </span>
        </button>

        <button
          className="flex border-solid border-2 text-white bg-grey w-29 h-9 my-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
          onClick={() => checkComments()}
        >
          Commenter
          <FaRegComment className="ml-2 w-15 h-6" />
          <span className="font-bold pl-2">
            {
              commentsData?.filter((comment) => comment.postId == post.id)
                .length
            }
          </span>
        </button>
      </div>
      {commentToggle ? (
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

          <section>
            {commentsData
              ?.filter((comment) => comment.postId == post.id)
              .map((res, index) => (
                <Comment
                  key={index}
                  comment={res}
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
