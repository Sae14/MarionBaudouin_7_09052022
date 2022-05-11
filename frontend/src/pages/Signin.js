import React from "react";
import Footer from "../components/Footer";
import FormSignin from "../components/FormSignin";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Signin = () => {
  return (
    <div className="signin-container">
      <header>
        <Logo />
        <Navigation />
      </header>
      <FormSignin />
      <Footer />
    </div>
  );
};

export default Signin;
