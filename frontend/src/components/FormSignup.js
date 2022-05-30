import React, { useState } from "react";
import axios from "axios";

const FormSignup = () => {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorPseudo, setErrorPseudo] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorMail(true);
    } else if (
      (pseudo.length > 0 && (pseudo.length < 2 || pseudo.length > 15)) ||
      !pseudo.match(/^[a-z-'A-Z]*$/)
    ) {
      setErrorPseudo(true);
    } else {
      setErrorMail(false);
      setErrorPseudo(false);
      const data = {
        email,
        name: pseudo,
        password,
      };

      axios
        .post(
          `http://localhost:${process.env.REACT_APP_PORT}/api/auth/signup`,
          data
        )
        .then(() => {
          setEmail("");
          setPseudo("");
          setPassword("");
          setSuccess(true);
          setErrorPassword("");
        })
        .catch((error) => {
          console.log(error);
          setErrorPassword(error.response.data.error);
        });
    }
  };

  return (
    <div className="form-signup-container">
      <h2>Inscription</h2>
      <form onSubmit={(e) => handleRegister(e)}>
        <label htmlFor="email">Email</label>
        <input
          style={{
            border: errorMail ? "2px solid red" : "2px solid #4E5166",
          }}
          type="email"
          placeholder="Indiquez votre mail"
          id="email"
          required
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <span className="error-container">
          {errorMail && "Veuillez entrer une adresse email au format valide"}
        </span>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          style={{
            border: errorPseudo ? "2px solid red" : "2px solid #4E5166",
          }}
          type="text"
          placeholder="Indiquez votre pseudo"
          id="pseudo"
          required
          autoComplete="off"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
        />
        <span className="error-container">
          {errorPseudo &&
            "Votre pseudo doit faire entre 2 et 15 caractères et ne doit pas contenir de caractères spéciaux/numériques"}
        </span>
        <label htmlFor="password">Mot de passe</label>
        <input
          style={{
            border: errorPassword ? "2px solid red" : "2px solid #4E5166",
          }}
          type="password"
          placeholder="Indiquez votre mot de passe"
          id="password"
          required
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span className="error-container">{errorPassword}</span>

        <input type="submit" value="Valider" />
        <span className="success-container">
          {success &&
            "Inscription validée ! Vous pouvez dès à présent vous connecter"}
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
