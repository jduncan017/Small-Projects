import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <section className="header">
      <h1 className="header__title">Welcome to "Small Projects!"</h1>
      <p className="header__description">
        This page renders tiny components that I've created that weren't
        noteworthy of their own application, but that I wanted to note
        nonetheless. Many of these came from coding interviews or time spent
        tinkering.
      </p>
    </section>
  );
};

export default Header;
