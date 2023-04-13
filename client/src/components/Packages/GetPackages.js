import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "../css/about.css"
import axios from 'axios'
const GetPackages = () => {
  const history = useNavigate();
  const [products, setProducts] = useState("");

  const callPackages = async () => {

    try {
      const data = await axios.get('/getpackages');
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error)
      history("/login")
    }
  }

  useEffect(() => {
    callPackages()
  }, [])
  return (
    <div className="body-package">
    <div className='package-body'>
      <section className='packages-cards'>
        <div class="row justify-content-center row-cols-1 row-cols-md-4">
          {
            products && products.data.packages.map((product) => (
              <div class="col auto mb-3">
                <div key={product._id} class="card h-100">
                  <img src="" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{product.package_name}</h5>
                    <p class="card-text">{product.description}</p>
                    <p class="card-text"><small class="text-muted">{product.price}$</small></p>
                    <NavLink to= {`/packages/${product._id}`}>
                    <a class="btn btn-primary">Go somewhere</a>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
    </div>

  )
}

export default GetPackages