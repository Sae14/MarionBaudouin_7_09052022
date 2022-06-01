import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormSignin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/api/auth/login`,
        data
      )
      .then((res) => {
        sessionStorage.setItem("mytoken", res.data.token);
        sessionStorage.setItem("myid", res.data.userId);
        sessionStorage.setItem("myrole", res.data.userRole);
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  };

  return (
    <div class=" m-2 p-2 rounded-lg bg-pink lg:w-2/4 lg:mx-auto xl:w-2/5">
      <h2 class="py-4 mx-auto w-20 font-bold text-lg">Connexion</h2>
      <form class="flex flex-col" onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="email">Email</label>
        <input
          class="my-4 rounded-md p-1"
          style={{
            border: error ? "2px solid red" : "2px solid #4E5166",
          }}
          type="email"
          placeholder="Indiquez votre mail"
          id="email"
          required
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          class="my-4 rounded-md p-1"
          style={{
            border: error ? "2px solid red" : "2px solid #4E5166",
          }}
          type="password"
          placeholder="Indiquez votre mot de passe"
          id="password"
          required
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          class="text-white bg-grey w-24 h-9 my-7 mx-auto cursor-pointer p-1 hover:bg-white hover:text-black rounded-xl"
          type="submit"
          value="Valider"
        />
        <span class="font-bold pb-3">
          {error &&
            "Le mail ou le mot de passe ne correspondent pas, veuillez réessayer"}
        </span>
      </form>
    </div>
  );
};

export default FormSignin;
