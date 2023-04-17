import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import "../css/indpackage.css"

const IndividualPackage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const history = useNavigate()

  const callPackages = async () => {
    try {
      const data = await axios.get('/getpackages');
      const prod = data.data.packages
      const indPackage = prod.find(p => p._id === id)
      setProduct(indPackage)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    callPackages()
  })


  return (
    <>
      <body>

        <section className="indpackage-main">
          <section className="jumbotron text-center bg-teal text-white">
            <div className="container">
              <h1 className='font-weight-bold'>Package Information</h1>
              <p className="lead">{product.user_name}'s Package Description</p>
            </div>
          </section>
          <section class="product-info-section mt-5">
            <div class="container">
              <div class="row border border-teal p-5 rounded">
                <div class="col-md-6">
                  <img src="https://via.placeholder.com/400x400" alt="Product Image" class="img-fluid" />
                </div>
                <div class="col-md-6">
                  <h1 class="display-4 font-weight-bold">{product.package_name}</h1>
                  <p class="lead">{product.description}</p>
                  <h2>Product Details</h2>
                  <ul class="list-group">
                    <li class="list-group-item font-weight-bold">Price: ${product.price}</li>
                    <li class="list-group-item">Freelancer: {product.user_name}</li>
                    <li class="list-group-item">E-Mail: {product.user_email}</li>
                  </ul>
                  <button class="btn btn-primary mt-3">Buy Package</button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </body>
    </>
  )
}

export default IndividualPackage