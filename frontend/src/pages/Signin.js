import React from "react";
import Footer from "../components/Footer";
import FormSignin from "../components/FormSignin";
import Logo from "../components/Logo";
import NavigationUnlog from "../components/NavigationUnlog";

const Signin = () => {
  return (
    <div>
      <header class="bg-red p-2 border-b-grey border-b-2">
        <Logo />
        <NavigationUnlog />
      </header>
      <FormSignin />
    </div>
  );
};

export default Signin;
