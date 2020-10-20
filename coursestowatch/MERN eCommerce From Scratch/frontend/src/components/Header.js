import React from "react";
import { Link } from "react-router-dom";

const Header = ({ brand }) => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-sm bg-dark mb-3 py-0 navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {brand}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/Cart" className="nav-link">
                  Cart <i className="fas fa-shopping-cart"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Signin" className="nav-link">
                  Signin <i className="fas fa-user"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
