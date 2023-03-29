import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import "../App.css"
import eKalah from "../images/eKalah.png"
const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top rounded-bottom navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
  <NavLink className="navbar-brand" to="/"><img src={eKalah} alt="Logo" width={95} height={50} /></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/status">Status</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Market</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar