import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
class AdminHomePage extends Component {

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
                    to="/manage"
                    style={{ color: "white" }}
                    activeClassName
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    exact
                    to="/addreceipe"
                    style={{ color: "white" }}
                    activeClassName
                  >
                    Add Details
                  </Link>
                </li>
              </ul>
            </div>
            <label style={{ color: "white" }}>
            {UserService.getUsername().username}</label>&nbsp;

            <Link style={{ color: "white" }}
            onClick={() => {
                UserService.logout();
              }} to='/login'>
              Logout
            </Link>
          </div>
        </nav>
            </div>
        )
    }
}

export default AdminHomePage
