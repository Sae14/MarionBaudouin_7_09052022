import React from "react";
import Footer from "../components/Footer";
import FormSignup from "../components/FormSignup";
import Logo from "../components/Logo";
import NavigationUnlog from "../components/NavigationUnlog";

const Signup = () => {
  return (
    <div className="signup-container">
      <header>
        <Logo />
        <NavigationUnlog />
      </header>
      <FormSignup />
      <Footer />
    </div>
  );
};

export default Signup;
