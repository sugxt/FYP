import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ".././css/about.css"
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
    },[])
  return (
    <div className='package-head'>
      {
        products && products.data.packages.map((product)=> (
          <div key={product._id} className="card" style={{width: 18+ 'rem'}}>
            <img src={product.image_url} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{product.package_name}</h5>
              <p className="card-text">{product.description}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        ))
      }
    </div>
  )
}

export default GetPackages