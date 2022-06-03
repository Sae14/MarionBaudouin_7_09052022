import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPost } from "../feature/postSlice";

const PostForm = ({ myToken, myId, myRole }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content || file) {
      if (content.length > 280) {
        setError(true);
      } else {
        const data = new FormData();
        if (file) data.append("image", file);
        data.append("content", content);

        axios
          .post(
            `http://localhost:${process.env.REACT_APP_PORT}/api/posts`,
            data,
            {
              headers: {
                Authorization: `Bearer ${myToken}`,
              },
            }
          )
          .then((res) => {
            dispatch(addPost(res.data.postres));
            resetPost();
            setError(false);
          })

          .catch((error) => console.log(error.message));
      }
    } else {
      alert("Veuillez ajouter un message et/ou une image");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };

  const resetPost = () => {
    setContent("");
    setFile("");
  };

  return (
    <div className=" shadow-md bg-pink mx-2 mb-16 rounded-lg p-2 lg:w-3/4 lg:mx-auto xl:w-3/5 2xl:w-2/5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className="w-full h-20 p-1 rounded-md mb-1"
          style={{
            border: error ? "2px solid red" : "2px solid #4E5166",
          }}
          placeholder="Exprimez vos ressentis du moment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>

        <div className="flex flex-col">
          <label className="font-bold" htmlFor="file">
            Joindre une image :
          </label>
          <input
            className="file:p-1 file:cursor-pointer file:text-sm file:mb-2 file:ml-1 file:rounded-full file:bg-grey file:text-white file:border-2 file:border-white file:border-solid hover:file:border-grey hover:file:bg-white hover:file:text-black"
            type="file"
            name="file"
            id="file"
            accept=".png, .jpg, .jpeg, .gif, .jfif"
            onChange={(e) => handlePicture(e)}
          />
          <div className="border-t-4 border-t-white">
            <input
              className="border-solid border-2 text-white bg-grey w-24 h-9 my-2 cursor-pointer mr-2 p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
              type="submit"
              value="Publier"
            />
            {content || file ? (
              <button
                className="text-sm border-solid border-2 text-white bg-grey w-23 h-8 my-2 cursor-pointer p-1 hover:border-grey hover:bg-white hover:text-black rounded-xl"
                onClick={resetPost}
              >
                Réinitialiser
              </button>
            ) : null}
          </div>
        </div>
        <span className="font-bold">
          {error && "Veuillez envoyer un message de moins de 280 caractères"}
        </span>
      </form>
    </div>
  );
};

export default PostForm;
