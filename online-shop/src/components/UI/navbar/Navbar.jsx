import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <a href="#" className="logo">
          <span className="icon_logo navbar__logo-icon"></span>
          <span className="logo__text">Candleaf</span>
        </a>
        <ul className="navbar__links">
          <li class="navigation__item">About</li>
          <li class="navigation__item">Discover</li>
        </ul>

        <ul className="tools">
          <li class="tools__item">
            <span className="icon_login"></span>
          </li>
          <li class="tools__item">
            <span className="icon_cart"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
