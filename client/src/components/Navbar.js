import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import "../App.css"
import eKalah from "../images/eKalahBlack.png"

const Navbar = () => {
  
  const RenderMenu = () =>{
      const token = localStorage.getItem("token")
      if (token) {
        return(
          <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/status">Status</NavLink>
                </li>
                <li className="nav-item">
                   <NavLink className="nav-link" to="/packages">Packages</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
            </>
        )
      } else {
        return(
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
               <NavLink className="nav-link" to="/signup">Register</NavLink>
            </li>
          </>
        )
      }
  }
  return (
    <>
    <nav className="navbar navbar-expand navbar-light bg-light py-2">
  <NavLink className="navbar-brand" to="/"><img src={eKalah} alt="Logo" width={90} height={35} /></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar