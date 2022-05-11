import React, { useState } from "react";
import axios from "axios";

const FormSignup = () => {
  const [email, setEmail] = useState([""]);
  const [pseudo, setPseudo] = useState([""]);
  const [password, setPassword] = useState([""]);

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      email,
      pseudo,
      password,
    };

    axios.post("http://localhost:3004/users", data).then(() => {
      setEmail("");
      setPseudo("");
      setPassword("");
    });
  };

  return (
    <div className="form-signup-container">
      <h2>Inscription</h2>
      <form onSubmit={(e) => handleRegister(e)}>
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
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          placeholder="Indiquez votre pseudo"
          id="pseudo"
          required
          autoComplete="off"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
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

export default FormSignup;
