import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";

const Home = () => {
  const [postsData, setPostsData] = useState([]);
  const [content, setContent] = useState("");

  const getData = () => {
    axios
      .get("http://localhost:3004/posts")
      .then((res) => setPostsData(res.data));
  };

  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // structure de contrôle

    const data = {
      // vérif user et image
      content,
      date: Date.now(),
    };

    axios.post("http://localhost:3004/posts", data).then(() => {
      setContent("");
      getData();
    });
  };

  return (
    <div className="home">
      <header>
        <Logo />
        <Navigation />
      </header>
      <h1>Accueil</h1>
      <div className="home-post-posts-container">
        <div className="form-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              placeholder="Exprimez vos ressentis du moment"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <div className="createpost-inputs-container">
              <label htmlFor="file">Voulez-vous ajouter une image ?</label>
              <input
                type="file"
                name="file"
                id="file"
                accept=".png, .jpg, .jpeg, .gif"
              />
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
