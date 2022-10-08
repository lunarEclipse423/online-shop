import React from "react";
import Button from "./UI/button/Button";
import "./AboutShopPage.css";

const AboutShopPage = () => {
  return (
    <div className="about-shop-page">
      <div className="about-shop-content">
        <h1 className="about-shop__title">
          🌱
          <br />
          The nature candle
        </h1>
        <p className="about-shop__text">
          We are focused on being eco-friendly and sustainable, using natural or recycled
          materials where we can - this is at the heart of every decision we make. We
          avoid using any unnecessary packaging materials and try to source all of our
          ingredients locally to support small local businesses wherever possible.
        </p>
        <Button>Discover our collection</Button>
      </div>
    </div>
  );
};

export default AboutShopPage;
