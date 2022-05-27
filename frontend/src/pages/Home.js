import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData, addPost } from "../feature/postSlice";

const Home = () => {
  const navigate = useNavigate();
  // const [postsData, setPostsData] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts.posts);
  const myId = sessionStorage.getItem("myid");
  const myRole = sessionStorage.getItem("myrole");
  const myToken = sessionStorage.getItem("mytoken");

  const getData = () => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/api/posts`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => dispatch(setPostsData(res.data)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    if (!myToken) {
      navigate("/signin");
    }
  }, []);

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
        .then(
          (res) => {
            dispatch(addPost([res.data.postObjectt]));
          }
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
        )
        .then(() => {
          dispatch(getData());
        });
      // .then(() => {
      //   dispatch(getData());
      // });
      // .catch((error) => console.log(error));
      resetPost();
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
    <div className="home">
      <header>
        <Logo />
        <Navigation />
      </header>
      <h2>Accueil</h2>
      <div className="home-post-posts-container">
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

        {/*   */}
        <section className="posts-container">
          {postsData &&
            [...postsData].map((posts, index) => (
              <Post
                key={index}
                post={posts}
                myToken={myToken}
                myId={myId}
                myRole={myRole}
              />
            ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
