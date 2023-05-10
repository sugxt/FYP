import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import "../css/indpackage.css"
import Navbar from '../Navbar';
import LoadingScreen from '../Others/LoadingScreen';

const IndividualPackage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [email, setEmail] = useState("");
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  const callPackages = async () => {
    try {
      const data = await axios.get('/getpackages');
      const prod = data.data.packages
      const indPackage = prod.find(p => p._id === id)
      setProduct(indPackage)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const res = await axios.get('/getdata');
      setEmail(res.data.email)
    } catch (error) {

    }
  }

  useEffect(() => {
    getData()
    callPackages()
  })


  return (
    <>
      <body>
        <Navbar />
        <div>
          {isLoading ? <LoadingScreen /> : (
            <div>
              <section className="indpackage-main">
                <section className="jumbotron jumbotron-fluid text-center bg-teal text-white pd-10">
                  <div className="container">
                    <h1 className='font-weight-bold'>Package Information</h1>
                    <p className="lead">{product.user_name}'s Package Description</p>
                  </div>
                </section>
                <section class="product-info-section mt-5">
                  <div class="container">
                    <div class="row border border-teal p-5">
                      <div class="col-md-6">
                        <img src={`http://localhost:5000/public/images/${product.image_url}`} alt="Product" class="img-fluid" />
                      </div>
                      <div class="col-md-5">
                        <h1 class="display-4 font-weight-bold">{product.package_name}</h1>
                        <p class="lead">{product.description}</p>
                        <h2>Product Details</h2>
                        <ul class="list-group">
                          <li class="list-group-item font-weight-bold">Price: ${product.price}</li>
                          <li class="list-group-item">Freelancer: {product.user_name}</li>
                          <li class="list-group-item">E-Mail: {product.user_email}</li>
                        </ul>
                        <div className="btn-toolbar">
                          {email === product.user_email ? (
                            <NavLink to={`/packages/update/${product._id}`}>
                              <button type="button" className="btn mr-3 mt-3 border-dark text-dark">Edit Package</button>
                            </NavLink>
                          ) : (
                            <NavLink to={`/packages/buy/${product._id}`}>
                              <button type="button" className="btn mr-3 mt-3 border-dark text-dark">Buy Package</button>
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          )}
        </div>
      </body>
    </>
  )
}

export default IndividualPackage