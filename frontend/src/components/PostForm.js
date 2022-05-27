import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPost } from "../feature/postSlice";

const PostForm = ({ myToken, myId, myRole }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content || file) {
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
        });
      resetPost();
      // .catch((error) => console.log(error));
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
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          placeholder="Exprimez vos ressentis du moment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>

        <div className="createpost-inputs-container">
          <input
            type="file"
            name="file"
            id="file"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={(e) => handlePicture(e)}
          />
          {content || file ? (
            <button onClick={resetPost}>Réinitialiser</button>
          ) : null}
          <input type="submit" value="Publier" />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
