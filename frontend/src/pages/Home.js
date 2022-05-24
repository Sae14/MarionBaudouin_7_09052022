import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";

const Home = ({ myToken, myId, myRole }) => {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    const getData = () => {
      if (!myToken) {
        navigate("/signin");
      }

      axios
        .get(`http://localhost:${process.env.REACT_APP_PORT}/api/posts`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        .then((res) => setPostsData(res.data));
    };
    getData();
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
        .then((res) => {
          console.log(res.data.postId);
          resetPost();
        });
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

        <section className="posts-container">
          {postsData
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((post) => (
              <Post
                key={post.id}
                post={post}
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
