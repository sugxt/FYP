import React, {useState} from 'react'
import "../App.css"
import { NavLink, useNavigate } from 'react-router-dom';

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

    setUser({...user, [name]:value});
  }

  const PostData = async (e) => {
      e.preventDefault();

      const {email,password} = user;

      const res = await fetch("/signin",{
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
        history('/')

        //history("/login");
      }
      
  }


  return (
    <>
      <section className='login-main'>
      <div className="Auth-form-container">
      <form className="Auth-form" method='POST'>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
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
            <button type="submit" className="btn btn-primary" value = 'login' onClick={PostData}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
           <a href="/">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
      </section>
    </>
  )
}

export default Login