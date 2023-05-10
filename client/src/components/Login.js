import React, { useEffect, useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../images/eKalahBlack.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const Login = () => {

  const history = useNavigate();
  const [user, setUser] = useState({
    email: "", password: ""
  });

  const checkLogin = () => {
    const token = localStorage.getItem("token")
    if (token){
      history("/home")
    }
  }

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
      toast.error("Invalid Login");
      console.log("Invalid Login");
    } else {
      toast.success("Login Successful");
      console.log("Successfull Login");
      localStorage.setItem("token", data.token)
      history('/')

      //history("/login");
    }

  }
  useEffect(() => {
    checkLogin()
  }, [])


  return (
    <>
      <body className="login-home-body">
      <ToastContainer />

        <form className="home-form-signin" method='POST'>
          <NavLink to='/'><img className="mb-4" src={Logo} alt="" style={{maxWidth: "100%", height: "auto"}} /></NavLink>
          <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
          <label for="inputEmail" className="sr-only">Email address</label>
          <input
            className="form-control mt-1"
            value={user.email}
            name="email"
            type="text"
            onChange={handleInputs}
            placeholder="Enter Your Email"
            autoComplete='off'
          />
          <label for="inputPassword" className="sr-only">Password</label>
          <input
              type="password"
              className="form-control mt-1"
              value = {user.password}
              onChange={handleInputs}
              placeholder="Enter Your Password"
              name = "password"
            />
          <div className="checkbox mb-3">
            <label>
              <p className='text-muted'>Don't Have An Account? <NavLink to="/signup"> <a className='text-dark'> Sign Up</a></NavLink></p>
            </label>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-primary btn-block" type="submit" value='login' onClick={PostData}>Sign in</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
        </form>
      </body>
    </>
  )
}

export default Login