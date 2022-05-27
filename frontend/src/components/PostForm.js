import React, { useState } from "react";
import axios from "axios";
// import { addPost } from "../feature/postSlice";
import { useDispatch } from "react-redux";
import { addPost } from "../feature/postSlice";

const PostForm = ({ getData, myToken, myId, myRole }) => {
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
          //   let dataObject = res.data.postObjectt;
          // const dataObject = {
          //   content: data.content,
          //   image: data.image,
          // };
          //   const dataObject = res.data.postObjectt;
          //   dispatch(addPost(dataObject));
          dispatch(addPost(res.data.postres));
          dispatch(getData);
          //   dispatch(getData);
          //   dispatch(getData());
          // dispatch(addPost([res.data.postObjectt]));
        });
      resetPost();
      //   dispatch(getData());
      // .then(() => dispatch(getData()));
      // const dataObject = Object.fromEntries(data);
      // const dataObject = {
      //   content: res.postContent,
      //   image: res.postImage,
      // };
      // Object.fromEntries(data);
      // dispatch(addPost([dataObject.content, dataObject.image.name]));
      // dispatch(addPost([data.content, res.postImage, res.postId]));
      // dispatch(addPost([dataObject.content, dataObject.image]))
      // dispatch(addPost([res.postContent, res.postImage]));
      // dispatch(addPost());
      // dispatch(addPost(dataObject));
      // dispatch(addPost(dataObject));
      // dispatch(addPost([dataObject.content, dataObject.image]));
      // dispatch(addPost(dataObject));
      // dispatch(addPost(res.data));
      // console.log(res.data);
      // dispatch(addPost(res.data)).then(() => dispatch(getData()));

      // dispatch(addPost(dataObject));

      // .then(() => {
      //   dispatch(getData());
      // });
      // .catch((error) => console.log(error));

      // const dataObject = Object.fromEntries(data);
      // const dataObject = Object.fromEntries(data);
      // const dataObject = data.entries();
      // dispatch(addPost(dataObject));
      // console.log(res.data.postId);
      //
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
