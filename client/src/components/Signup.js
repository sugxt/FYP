import React, {useState}from 'react'
import {NavLink, useNavigate} from "react-router-dom";

const Signup = () => {

  const history = useNavigate();
  const [user, setUser] = useState({
      name:"", email:"",phone:"",password:"",cpassword:""
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

      const {name, email, phone, password, cpassword} = user;

      const res = await fetch("/register",{
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
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("Registration Successful");
        console.log("Successfull Registration");

        //history("/login");
      }
      
  }

  return (
    <>
     <section className='login-main'>
      <div className="Auth-form-container">
      <form className="Auth-form" method='POST'>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              value = {user.name}
              name = "name"
              onChange={handleInputs}
              type="text"
              className="form-control mt-1"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email Address</label>
            <input
              value = {user.email}
              name = "email"
              onChange={handleInputs}
              type="email"
              className="form-control mt-1"
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone Number</label>
            <input
              value = {user.phone}
              onChange={handleInputs}
              name = "phone"
              type="text"
              className="form-control mt-1"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name = "password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter your password"
              value = {user.password}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group mt-3">
            <label>Re-Enter Password</label>
            <input
              value = {user.cpassword}
              onChange={handleInputs}
              type="password"
              name = "cpassword"
              className="form-control mt-1"
              placeholder="Confirm your password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" value = "register" name="signupbtn" onClick={PostData}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
      </section>
    </>
  )
}

export default Signup