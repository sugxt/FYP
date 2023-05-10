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
  }, [])
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
                        <a className="btn border-white font-weight-bold text-white">Create a Package</a>
                      </NavLink>
                    </p>
                  </div>
                </section>

                <div className="album py-5">
                  <div className="container">

                    <div className="row">
                      {
                        products && products.data.packages.map((product) => (
                          <div className="col-md-4">
                            <div className="card mb-4 shadow-sm">
                              <img src={`http://localhost:5000/public/images/${product.image_url}`} class="card-img-top" alt="..." height="200" width="200" />
                              <div className="card-body">
                                <h5 className="card-title">{product.package_name}</h5>
                                <p className="card-text">{product.description}.</p>
                                <p className="card-text"><small className="font-weight-bold">Price: {product.price}$</small></p>
                                <p className="card-text"><small className="text-muted">{product.user_name}</small></p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="btn-toolbar">
                                    <NavLink to={`/packages/${product._id}`}>
                                      <button type="button" className="btn btn-sm mr-3 text-dark border-dark">View Package</button>
                                    </NavLink>
                                    {email === product.user_email && (
                                      <NavLink to={`/packages/update/${product._id}`}>
                                        <button type="button" className="btn btn-sm mr-3 text-dark border-dark">Edit Package</button>
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
          </div>
        )}
      </div>

    </>
    // <div className="body-package">
    //   <div className='package-body'>
    //     <section className='packages-cards'>
    //       <div className="row justify-content-center row-cols-1 row-cols-md-4">
    //         {
    //           products && products.data.packages.map((product) => (
    //             <div className="col auto mb-3">
    //               <div key={product._id} className="card h-100">
    //                 <img src="" className="card-img-top" alt="..." />
    //                 <div className="card-body">
    //                   <h5 className="card-title">{product.package_name}</h5>
    //                   <p className="card-text">{product.description}</p>
    //                   <p className="card-text"><small className="text-muted">Price: {product.price}$</small></p>
    //                   <NavLink to={`/packages/${product._id}`}>
    //                     <a className="btn btn-primary">Go somewhere</a>
    //                   </NavLink>
    //                 </div>
    //               </div>
    //             </div>
    //           ))
    //         }
    //       </div>
    //     </section>
    //   </div>
    // </div>

  )
}

export default GetPackages