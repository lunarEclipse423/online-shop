import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/button/Button";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-wrapper">
      <img
        src="https://cliply.co/wp-content/uploads/2021/09/142109670_SAD_CAT_400.gif"
        alt="sad cat"
        width="200"
        height="200"
      />
      <h1 className="error__title">Whoops!</h1>
      <span>We can't seem the page you are looking for</span>
      <Link className="home__link" to="/catalog">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
