import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ total }) => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Shopping
        </Link>
        <Link to="/cart" className="right">
          <span className="total" data-count={total}>
            <i className="large material-icons">shopping_cart</i>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
