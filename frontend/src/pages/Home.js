import React from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="home">
      <header>
        <Logo />
        <Navigation />
      </header>
      <Footer />
    </div>
  );
};

export default Home;
