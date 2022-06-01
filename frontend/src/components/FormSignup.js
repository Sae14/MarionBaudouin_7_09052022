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
    <div class="m-2 p-2 rounded-lg bg-pink lg:w-2/4 lg:mx-auto xl:w-2/5">
      <h2 class="py-4 mx-auto w-20 font-bold text-lg">Inscription</h2>
      <form class="flex flex-col" onSubmit={(e) => handleRegister(e)}>
        <label htmlFor="email">Email</label>
        <input
          class="my-4 rounded-md p-1"
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
        <span class="font-bold pb-3">
          {errorMail && "Veuillez entrer une adresse email au format valide"}
        </span>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          class="my-4 rounded-md p-1"
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
        <span class="font-bold pb-3">
          {errorPseudo &&
            "Votre pseudo doit faire entre 2 et 15 caractères et ne doit pas contenir de caractères spéciaux/numériques"}
        </span>
        <label htmlFor="password">Mot de passe</label>
        <input
          class="my-4 rounded-md p-1"
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
        <span class="font-bold pb-3">{errorPassword}</span>

        <input
          class="text-white bg-grey w-24 h-9 my-7 mx-auto cursor-pointer p-1 hover:bg-white hover:text-black rounded-xl"
          type="submit"
          value="Valider"
        />
        <span class="font-bold">
          {success &&
            "Inscription validée ! Vous pouvez dès à présent vous connecter"}
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
