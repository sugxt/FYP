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
    <body>

      <main role="main">

        <section className="jumbotron text-center">
          <div className="container">
            <h1>Packages</h1>
            <p className="lead text-muted">This is the marketplace for all the amazing packages you can find.</p>
            <p>
              <a href="#" className="btn btn-primary my-2">Main call to action</a>
              <a href="#" className="btn btn-secondary my-2">Secondary action</a>
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">

            <div className="row">
              {
                products && products.data.packages.map((product) => (
                  <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
                        role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef"
                          dy=".3em">{product.package_name}</text>
                      </svg>

                      <div className="card-body">
                        <h5 className="card-title">{product.package_name}</h5>
                        <p className="card-text">{product.description}.</p>
                        <p className="card-text"><small className="text-muted">Price: {product.price}$</small></p>
                        <p className="card-text"><small className="text-muted">{product.user_name}</small></p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                          <NavLink to={`/packages/${product._id}`}>
                            <button type="button" className="btn btn-sm btn-outline-secondary">View Package</button>
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
    </body>
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