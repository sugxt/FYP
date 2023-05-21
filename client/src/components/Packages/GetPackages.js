import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "../css/about.css"
import axios from 'axios'
import Navbar from '../Navbar';
import LoadingScreen from '../Others/LoadingScreen';


const GetPackages = () => {
  const history = useNavigate();
  const [products, setProducts] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState('');

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
  const getUser = async () => {
    try {
      const userData = await axios.get('/getdata');
      setUser(userData.data.name)
      setEmail(userData.data.email)
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    callPackages()
    getUser()
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/search/products/?key=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSearchResults()
  }, [searchQuery])
  return (
    <>
      <Navbar />
      <div>
        {isLoading ? <LoadingScreen /> : (
          <div>
            <body>
              <main role="main">

                <section className="jumbotron jumbotron-fluid text-center bg-teal text-white pd-10">
                  <div className="container">
                    <h1 className='font-weight-bold'>Welcome {user}</h1>
                    <p className="lead">This is the marketplace for all the amazing packages you can find.</p>
                    <p>
                      <NavLink to="/packages/add">
                        <a className="btn border-white font-weight-bold text-teal bg-white border-rounded">Create a Package</a>
                      </NavLink>
                    </p>
                  </div>
                </section>

                <div className="album py-3">
                  <div className="container">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                      />
                    </div>

                    <div className="row mt-4">
                      {searchResults.map((product) => (
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
                                <small className="font-weight-bold">Price: Rs.{product.price}</small>
                              </p>
                              <p className="card-text">
                                <small className="text-muted">{product.user_name}</small>
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-toolbar">
                                  <NavLink to={`/packages/${product._id}`}>
                                    <button type="button" className="btn btn-sm mr-3 text-dark border-dark">
                                      View Package
                                    </button>
                                  </NavLink>
                                  {email === product.user_email && (
                                    <NavLink to={`/packages/update/${product._id}`}>
                                      <button type="button" className="btn btn-sm mr-3 text-dark border-dark">
                                        Edit Package
                                      </button>
                                    </NavLink>
                                  )}
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
            </body>
            <footer className="bg-teal text-white text-center p-3">
              <div className="container">
                <p className="mb-0">eKalah &copy;</p>
                <p className="mb-0">Final Year Project for Herald College Kathmandu.</p>
              </div>
            </footer>
          </div>
        )}
      </div>

    </>
  )
}

export default GetPackages