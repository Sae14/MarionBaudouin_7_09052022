import React from "react";
import Footer from "../components/Footer";
import FormSignup from "../components/FormSignup";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Signup = () => {
  return (
    <div className="signup-container">
      <header>
        <Logo />
        <Navigation />
      </header>
      <FormSignup />
      <Footer />
    </div>
  );
};

export default Signup;
