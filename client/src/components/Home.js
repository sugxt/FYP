import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./css/home.css"
import { NavLink, useNavigate } from 'react-router-dom';

export const Home = () => {
  const history = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem("token")
    if (token) {
      history("/home")
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <div classNameName="home">
        <div className="jumbotron p-4 p-md-5 text-white bg-teal">
          <div className="col-md-6 px-0">
            <h1 className="display-4 font-italic lead">Unlock Your Freelancing Potential: Find Your Next Gig with Ease</h1>
            <p className="lead my-3">Join a Thriving Community of Freelancers and Clients: Get Access to High-Quality Projects, Collaborate with Top Talent, and Grow Your Business.</p>
            <NavLink to="/signup">
              <p className="lead mb-0"><a className="text-white font-weight-bold">Sign Up to eKalah...</a></p>
            </NavLink>
          </div>
        </div>
        <div className="jumbotron p-4 p-md-5 text-white bg-green">
          <div class="col-md-8 offset-md-4">
            <h1 className="display-3 font-italic lead text-teal">Collaborate with <br /> Top Talent</h1>
            <p className="lead my-3 text-teal">Our community of freelancers is made up of the best and brightest in their respective fields. Work alongside other experts to create amazing projects and build your network. <br /> Already have an account?</p>
            <NavLink to="/login">
              <p className="lead mb-0"><a className="text-teal font-weight-bold">Sign In to eKalah...</a></p>
            </NavLink>
          </div>
        </div>

      </div>
    </>
  )
}
export default Home;