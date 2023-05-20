import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/about.css"
import { Container, Row, Col, Image, Button } from "react-bootstrap"
import axios from 'axios';
import Navbar from './Navbar';
import LoadingScreen from './Others/LoadingScreen';

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
      <Navbar />
      <div>
        {isLoading ? <LoadingScreen /> : (
          <div>
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-lg-6 mb-4 mb-lg-0">
                    <div className="card mb-4" style={{ borderRadius: ".5rem" }}>
                      <div className="row g-0">
                        <div className="col-md-4 gradient-custom text-center text-white"
                          style={{ borderTopLeftRadius: ".3rem", borderBottomLeftRadius: ".3rem" }}>
                          <img src={user.photo}
                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                          <h5>{user.name}</h5>
                          <p>{user.role}</p>
                          <NavLink to="/about/update"><button className='btn btn-sm bg-white text-dark'> Edit Info</button></NavLink>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body p-4">
                            <h3 className='font-weight-bold'>Information</h3>
                            <hr className="mt-0 mb-4" />
                            <div className="row pt-1">
                              <div className="col-7 mb-3">
                                <h6>Email</h6>
                                <p className="text-muted">{user.email}</p>
                              </div>
                              <div className="col-7 mb-3">
                                <h6>Phone</h6>
                                <p className="text-muted">{user.phone}</p>
                              </div>
                            </div>
                            <h6>Projects</h6>
                            <hr className="mt-0 mb-4" />
                            <div className="row pt-1">
                              <div className="col-5 mb-3">
                                <div className="d-flex justify-content-between">
                                  <button type="button" className="btn btn-sm mr-3 text-dark border-dark">View Packages</button>
                                  {user.role === "admin" ? (
                                    <NavLink to='/admin/dashboard'> <button type="button" className="btn btn-sm mr-3 text-dark border-dark">Go to Dashboard</button></NavLink>
                                  ) : null}
                                </div>
                              </div>

                            </div>
                            <div className="d-flex justify-content-start">
                              <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                              <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                              <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className='p-3'>Your Packages</h1>
              <hr className="my-4" />
              <div className="admin-packages">
                <div className="container">

                  <div className="row">
                    {/* Checking if the E-Mail of the User Matches the E-Mail in the Package */}
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
                                    <button type="button" className="btn btn-sm mr-3">
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
            </section>
          </div>
        )}
      </div>
    </>
  )
}


export default About