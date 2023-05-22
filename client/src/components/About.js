import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/about.css"
import axios from 'axios';
import Navbar from './Navbar';
import LoadingScreen from './Others/LoadingScreen';
import Logo from '../images/eKalahWhite.png';

const About = () => {

  const history = useNavigate();
  const [user, setUserData] = useState("");
  const [products, setProducts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const callPackages = async () => {

    try {
      const data = await axios.get('/getpackages');
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error)
      history("/")
    }
  }

  const callAboutPage = async () => {

    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: 'include'

      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
      setIsLoading(false)

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (error) {
      //console.log(error)
      history("/login")
    }
  }

  useEffect(() => {
    callAboutPage()
    callPackages()
  }, [])



  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <body>
            <div className="container-fluid">
              <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
                  <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link text-white active">
                          <span data-feather="home"></span>
                          <NavLink className="navbar-brand" to="/"><img src={Logo} alt="Logo" width={90} height={35} /></NavLink>
                        </a>
                      </li>
                      <hr className="mt-0 mb-4 bg-white" />
                      <li className="nav-item">
                        <NavLink to="/home" className="nav-link text-white">
                          <span data-feather="file"></span>
                          Home
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/packages/view" className="nav-link text-white">
                          <span data-feather="file"></span>
                          Buyers
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/home" className="nav-link text-white">
                          <span data-feather="file"></span>
                          Packages
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/about/reset" className="nav-link text-white">
                          <span data-feather="file"></span>
                          Reset Password
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/logout" className="nav-link text-white">
                          <span data-feather="file"></span>
                          Log Out
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2 font-weight-bold">Profile</h1>
                  </div>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                        <div className="card mb-4">
                          <div className="card-body">
                            <div className="text-center">
                              <img src={user.photo} alt="Avatar" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                              <h4 className="card-title">{user.name}</h4>
                              <p className="card-text"><i className="fa fa-user"></i>{user.role}</p>
                              <div className="btn-toolbar justify-content-center">
                                <NavLink to="/about/update">
                                  <button className="btn btn-sm bg-teal text-white mr-3">Edit Information</button>
                                </NavLink>
                                <NavLink to="/about/reset">
                                  <button className="btn btn-sm bg-teal text-white mr-3">Reset Password</button>
                                </NavLink>
                                {user.role === "admin" ? (
                                  <NavLink to='/admin/dashboard'>
                                    <button type="button" className="btn btn-sm bg-teal text-white mr-3">Go to Dashboard</button>
                                  </NavLink>
                                ) : null}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-6">
                                <h5>Email:</h5>
                                <p>{user.email}</p>
                              </div>
                              <div className="col-6">
                                <h5>Phone:</h5>
                                <p>{user.phone}</p>
                              </div>
                              {/* Add more user profile information fields here */}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2 font-weight-bold">Your Packages</h1>
                  </div>
                  <div className="user-packages">
                    <div className="container">
                      <div className="row">
                        {products && products.data.packages
                          .filter(product => product.user_email === user.email)
                          .map(product => (
                            <div className="col-md-4" key={product._id}>
                              <div className="card mb-4 shadow-sm">
                                <img
                                  src={`http://localhost:5000/public/images/${product.image_url}`}
                                  className="card-img-top"
                                  alt="..."
                                  height="200"
                                  width="200"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">{product.package_name}</h5>
                                  <p className="card-text">{product.description}.</p>
                                  <p className="card-text">
                                    <small className="font-weight-bold">
                                      Price: {product.price}$
                                    </small>
                                  </p>
                                  <p className="card-text">
                                    <small className="text-muted">{product.user_name}</small>
                                  </p>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-toolbar">
                                      <NavLink to={`/packages/${product._id}`}>
                                        <button type="button" className="btn btn-sm mr-3 bg-dark text-white border-rounded">
                                          View Package
                                        </button>
                                      </NavLink>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </body>
        </div>
      )}
    </>

  )
}


export default About