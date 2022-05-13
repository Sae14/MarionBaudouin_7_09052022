import React from "react";
import Footer from "../components/Footer";
import FormSignin from "../components/FormSignin";
import Logo from "../components/Logo";
import NavigationUnlog from "../components/NavigationUnlog";

const Signin = () => {
  return (
    <div className="signin-container">
      <header>
        <Logo />
        <NavigationUnlog />
      </header>
      <FormSignin />
      <Footer />
    </div>
  );
};

export default Signin;
