import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <Link className="logo" to="/about">
          <span className="icon_logo navbar__logo-icon"></span>
          <span className="logo__text">Candleaf</span>
        </Link>
        <ul className="navbar__links">
          <li className="navigation__item">
            <Link className="navigation__link" to="/about">
              About
            </Link>
          </li>
          <li className="navigation__item">
            <Link className="navigation__link" to="/catalog">
              Discover
            </Link>
          </li>
        </ul>

        <ul className="tools">
          <li className="tools__item">
            <span className="icon_login"></span>
          </li>
          <li className="tools__item">
            <span className="icon_cart"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
