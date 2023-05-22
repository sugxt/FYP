import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./css/home.css"
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../images/eKalahWhite.png'

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
      <div className="body-home">
        <div className="container banner">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar">
                <div className="navbar-brand"><img src={Logo} alt="Logo" width={90} height={35} /></div>
                <ul className="nav">
                  <li className="nav-item text-dark">
                    <NavLink to="/" className="nav-link"> HOME</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link"> LOGIN</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link"> REGISTER</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-8 offset-md-2 info">
              <h1 className="text-center">eKalah</h1>
              <p className="text-center">
                Join our thriving community of talented freelancers and clients
              </p>
              <NavLink to="/signup" className='btn btn-md text-center'> GET STARTED</NavLink>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-white py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 about-right">
                <h2>Find the perfect freelancer for your project</h2>
                <p>With eKalah, you can easily search and connect with talented freelancers from around the world who specialize in various industries and skill sets.</p>
                <p>From web design and development to content creation and marketing, our freelancers are here to help you achieve your goals.</p>
              </div>
              <div className="col-md-6 about-left">
                <h2>Grow your freelancing career with eKalah</h2>
                <p>As a freelancer, eKalah offers you access to a wide range of exciting projects and opportunities from clients around the world.</p>
                <p>You can showcase your portfolio, connect with clients, and get paid securely through our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-teal text-white text-center p-3">
        <div className="container">
          <p className="mb-0">eKalah &copy;</p>
          <p className="mb-0">Final Year Project for Herald College Kathmandu.</p>
        </div>
      </footer>
    </>
  )
}
export default Home;