import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReceipeTypeHomePage from "./ReceipeTypeHomePage";
class HomePage extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg  bg-success">
          <div className="container">
            <Link className="navbar-brand" to="/" style={{ color: "white" }}>
              
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    exact
                    to="/"
                    style={{ color: "white" }}
                    activeClassName
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </div>
        </nav>
        {window.location.pathname=="/"?<ReceipeTypeHomePage/>:""}
          
      </div>
    );
  }
}

export default HomePage;
