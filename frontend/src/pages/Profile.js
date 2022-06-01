import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../feature/userSlice";
import ProfileUpdate from "../components/ProfileUpdate";

const Profile = () => {
  const navigate = useNavigate();
  // const [myProfile, setMyProfile] = useState([]);
  const dispatch = useDispatch();
  const myId = sessionStorage.getItem("myid");
  const myRole = sessionStorage.getItem("myrole");
  const myToken = sessionStorage.getItem("mytoken");

  //setMyProfile(user.data))

  const getData = () => {
    if (!myToken) {
      navigate("/signin");
    } else {
      axios
        .get(
          `http://localhost:${process.env.REACT_APP_PORT}/api/auth/${myId}`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(setUserData(res.data));
        })
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

      <h2 class="py-4 mx-auto w-14 font-bold text-lg ">Profil</h2>

      <ProfileUpdate myToken={myToken} myId={myId} myRole={myRole} />

      <Footer />
    </div>
  );
};

export default Profile;
