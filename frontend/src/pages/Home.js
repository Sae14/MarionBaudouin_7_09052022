import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../feature/postSlice";
import PostForm from "../components/PostForm";

const Home = () => {
  const navigate = useNavigate();
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

  return (
    <div className="home">
      <header>
        <Logo />
        <Navigation />
      </header>
      <h2>Accueil</h2>
      <div className="home-post-posts-container">
        <PostForm
          getData={getData}
          myId={myId}
          myToken={myToken}
          myRole={myRole}
        />
        {/*  && [...postsData] */}
        <section className="posts-container">
          {postsData?.map((posts, index) => (
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
