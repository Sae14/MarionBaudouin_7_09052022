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
    if (!myToken) {
      navigate("/signin");
    } else {
      axios
        .get(`http://localhost:${process.env.REACT_APP_PORT}/api/posts`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        .then((res) => dispatch(setPostsData(res.data)))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <header class="bg-red p-2 border-b-grey border-b-2">
        <Logo />
        <Navigation />
      </header>
      <h2 class="py-4 mx-auto w-14 font-bold text-lg">Accueil</h2>

      <PostForm myId={myId} myToken={myToken} myRole={myRole} />
      <section class=" m-2 lg:w-3/4 lg:mx-auto xl:w-3/5 2xl:w-2/5">
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

      <Footer />
    </div>
  );
};

export default Home;
