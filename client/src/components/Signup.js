import React, { useState } from 'react'
import "../App.css"
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../images/eKalahBlack.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css';

const Signup = () => {

  const history = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", password: "", cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name
    value = e.target.value

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name, email, phone, password, cpassword
      })
    });

    const data = await res.json();
    console.log(data.status)

    if (res.status === 422 || !data) {
      toast.error("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      toast.success("Registration Successful");
      console.log("Successfull Registration");

      history("/login");
    }

  }

  return (
    <>
      <body className="login-home-body">
        <div className="container">
          <article className="card-body mx-auto" style={{ maxWidth: 400 + 'px' }}>
            <NavLink to='/'>
            <img className="mb-4" src={Logo} alt="" style={{ maxWidth: "100%", height: "auto" }} />
            </NavLink>
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <p className="text-center">Get started with your free account</p>
            <p className="divider-text">
              <span></span>
            </p>
            <form>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                <input
                  value={user.name}
                  name="name"
                  onChange={handleInputs}
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                </div>
                <input
                  value={user.email}
                  name="email"
                  onChange={handleInputs}
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                </div>
                <input
                  value={user.phone}
                  onChange={handleInputs}
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Phone Number"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                </div>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                </div>
                <input
                  value={user.cpassword}
                  onChange={handleInputs}
                  type="password"
                  name="cpassword"
                  className="form-control"
                  placeholder="Confirm your password"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" value="register" name="signupbtn" onClick={PostData}>
                  Submit
                </button>
              </div>
              <p className="text-center">Have an account? <NavLink to="/login"><a className='text-dark'>Log In</a></NavLink> </p>
            </form>
          </article>

        </div>
      </body>
    </>
  )
}

export default Signup