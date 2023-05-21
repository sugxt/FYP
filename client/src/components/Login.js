import React, { useEffect, useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../images/eKalahBlack.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      history("/home");
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateInputs = () => {
    setIsEmailEmpty(user.email === "");
    setIsPasswordEmpty(user.password === "");
  };

  const PostData = async (e) => {
    e.preventDefault();

    validateInputs();

    if (user.email === "" || user.password === "") {
      toast.error("Please fill in all the fields");
      return;
    }

    const { email, password } = user;

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error("Invalid Login");
      console.log("Invalid Login");
    } else {
      toast.success("Login Successful");
      console.log("Successful Login");
      localStorage.setItem("token", data.token);
      history('/');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <body className="login-home-body">
        <form className="home-form-signin" method="POST">
          <NavLink to="/">
            <img className="mb-4" src={Logo} alt="" style={{ maxWidth: "100%", height: "auto" }} />
          </NavLink>
          <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
          <div className={`form-label-group ${isEmailEmpty ? "has-error" : ""}`}>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              className="form-control mt-1"
              value={user.email}
              name="email"
              type="text"
              onChange={handleInputs}
              placeholder="Enter Your Email"
              autoComplete="off"
              required
            />
            {isEmailEmpty && <span className="text-danger">Email is required</span>}
          </div>
          <div className={`form-label-group ${isPasswordEmpty ? "has-error" : ""}`}>
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="form-control mt-1"
              value={user.password}
              onChange={handleInputs}
              placeholder="Enter Your Password"
              name="password"
              required
              autoFocus
            />
            {isPasswordEmpty && <span className="text-danger">Password is required</span>}
          </div>
          <div className="checkbox mb-3">
            <label>
              <p className="text-muted">
                Don't Have An Account? <NavLink to="/signup"> <a className="text-dark"> Sign Up</a></NavLink>
              </p>
            </label>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-primary btn-block" type="submit" value="login" onClick={PostData}>
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
        </form>
      </body>
    </>
  );
};

export default Login;
