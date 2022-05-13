import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormSignin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios.post("http://localhost:3004/users", data).then((res) => {
      setToken(res.data.mytoken);
      if (token) {
        Storage.setItem("token", token);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        alert("Veuillez vous connecter à nouveau");
      }
    });
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
