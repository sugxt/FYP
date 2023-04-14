import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';


const IndividualPackage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

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

    </>
  )
}

export default IndividualPackage