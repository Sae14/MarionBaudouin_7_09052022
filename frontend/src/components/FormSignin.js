import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormSignin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-signin-container">
      <h2>Connexion</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="email">Email</label>
        <input
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
          type="password"
          placeholder="Indiquez votre mot de passe"
          id="password"
          required
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
};

export default FormSignin;
