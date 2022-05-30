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
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          style={{
            border: error ? "2px solid red" : "2px solid #4E5166",
          }}
          placeholder="Exprimez vos ressentis du moment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>

        <div className="createpost-inputs-container">
          <label htmlFor="file">Joindre une image :</label>
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
        <span className="error-container">
          {error && "Veuillez envoyer un message de moins de 280 caractères"}
        </span>
      </form>
    </div>
  );
};

export default PostForm;
