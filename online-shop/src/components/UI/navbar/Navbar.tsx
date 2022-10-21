import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activateModal } from "../../../store/actions/modal";
import { logout } from "../../../store/actions/login";
import { useTypedSelector } from "../../../hooks/storeHooks";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useTypedSelector((state) => state.isLogged);
  const cartItemsCount = useTypedSelector(
    (state) => state.manageCartItems.cartItems.length
  );

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
          <li className={isLogged === "user" ? "tools__item" : "tools__item hidden"}>
            <Link className="navigation__link" to="/cart">
              <span className="icon_cart navbar__icon-cart">
                <div className={cartItemsCount > 0 ? "cart-items-indicator" : "hidden"}>
                  <span>{cartItemsCount}</span>
                </div>
              </span>
            </Link>
          </li>
          <li
            data-testid="button-sign-in"
            onClick={() => dispatch(activateModal())}
            className={
              isLogged === "user" || isLogged === "admin"
                ? "tools__item hidden"
                : "tools__item"
            }
          >
            <span className="icon_login"></span>
          </li>
          <li
          data-testid="button-logout"
            onClick={() => {
              dispatch(logout());
              navigate("/about");
            }}
            className={
              isLogged === "user" || isLogged === "admin"
                ? "tools__item"
                : "tools__item hidden"
            }
          >
            <span className="icon_logout"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
