import React from "react";
import FormSignup from "../components/FormSignup";
import Logo from "../components/Logo";
import NavigationUnlog from "../components/NavigationUnlog";

const Signup = () => {
  return (
    <div>
      <header className="bg-red p-2 border-b-grey border-b-2">
        <Logo />
        <NavigationUnlog />
      </header>
      <FormSignup />
    </div>
  );
};

export default Signup;
