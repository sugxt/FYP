import React, { useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../images/eKalah.png'

const Login = () => {

  const history = useNavigate();
  const [user, setUser] = useState({
    email: "", password: ""
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

    const { email, password } = user;

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Login");
      console.log("Invalid Login");
    } else {
      window.alert("Login Successful");
      console.log("Successfull Login");
      localStorage.setItem("token", data.token)
      history('/')

      //history("/login");
    }

  }


  return (
    <>
      <body className="home-body">

        <form className="home-form-signin" method='POST'>
          <img className="mb-4" src={Logo} alt="" />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" className="sr-only">Email address</label>
          <input
            className="form-control mt-1"
            value={user.email}
            name="email"
            type="text"
            onChange={handleInputs}
            placeholder="Enter email"
            autoComplete='off'
          />
          <label for="inputPassword" className="sr-only">Password</label>
          <input
              type="password"
              className="form-control mt-1"
              value = {user.password}
              onChange={handleInputs}
              placeholder="Enter password"
              name = "password"
            />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-primary btn-block" type="submit" value='login' onClick={PostData}>Sign in</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
        </form>
      </body>
      {/* <section className='login-main'>
      <div className="Auth-form-container">
      <form className="Auth-form" method='POST'>
        <div className="Auth-form-content">
          <h2 className='Auth-form-image'> <img src = {Logo}/> </h2>
          <h4 className="Auth-form-title">Sign In</h4>
          <div className="form-group mt-3">
            <label>Email Address</label>
            <input
              className="form-control mt-1"
              value = {user.email}
              name="email"
              type = "text"
              onChange={handleInputs}
              placeholder="Enter email"
              autoComplete='off'
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              value = {user.password}
              onChange={handleInputs}
              placeholder="Enter password"
              name = "password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn" value = 'login' onClick={PostData}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2"></p>
           <a className="fpassword" href="/">Forgot password?</a>
        </div>
      </form>
    </div>
      </section> */}
    </>
  )
}

export default Login