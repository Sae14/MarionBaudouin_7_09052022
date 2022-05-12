import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";

const Home = () => {
  const [postsData, setPostsData] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const getData = () => {
    axios
      .get("http://localhost:3004/posts")
      .then((res) => setPostsData(res.data));
  };

  useEffect(() => getData(), []);

  const handleSubmit =
    // async
    (e) => {
      e.preventDefault();

      if (content || file) {
        const data = {
          author: "Alix",
          content,
          date: Date.now(),
        };

        // const data = new FormData();
        // data.append("content", content);
        // data.append("date", Date.now());
        // if (file) data.append("file", file);

        // await
        axios.post("http://localhost:3004/posts", data).then(() => {
          resetPost();
          getData();
        });
      } else {
        alert("Veuillez ajouter un message et/ou une image");
      }
    };

  const handlePicture = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    //setFile(e.target.files[0]);
  };

  const resetPost = () => {
    setContent("");
    setFile("");
    //setPicture(URL.revokeObjectURL);
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
                <button onClick={resetPost}>Reset</button>
              ) : null}
              <input type="submit" value="Publier" />
            </div>
          </form>
        </div>

        <section className="posts-container">
          {postsData
            .sort((a, b) => b.date - a.date)
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
