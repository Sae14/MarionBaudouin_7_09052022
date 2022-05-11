import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";

const Home = () => {
  const [postsData, setPostsData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3004/posts")
      .then((res) => setPostsData(res.data));
  };

  useEffect(() => getData(), []);

  return (
    <div className="home">
      <header>
        <Logo />
        <Navigation />
      </header>
      <h1>Accueil</h1>
      <section>
        {postsData
          .sort((a, b) => b.date - a.date)
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
