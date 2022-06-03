import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../feature/postSlice";
import PostForm from "../components/PostForm";
import { setCommentsData } from "../feature/commentSlice";
import { setLikesData } from "../feature/likeSlice";

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

  const getComments = () => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/api/comments`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        dispatch(setCommentsData(res.data));
      })
      .catch((error) => console.log(error));
  };

  const getLikes = () => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_PORT}/api/likes`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        dispatch(setLikesData(res.data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!myToken) {
      navigate("/signin");
    } else {
      getData();
      getComments();
      getLikes();
    }
  }, []);

  return (
    <div>
      <header className="bg-red p-2 border-b-grey border-b-2">
        <Logo />
        <Navigation />
      </header>
      <h2 className="py-4 mx-auto w-14 font-bold text-lg">Accueil</h2>

      <PostForm myId={myId} myToken={myToken} myRole={myRole} />
      <section className=" m-2 lg:w-3/4 lg:mx-auto xl:w-3/5 2xl:w-2/5">
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
