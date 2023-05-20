import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Packages = () => {
  const history = useNavigate();
  const [user, setUserData] = useState({ user_name: '', user_email: '' });
  const [userPkg, setUserPkg] = useState({ package_name: "", image_url: "", description: "", price: "" });


  const uploadImage = async (e) => {
    setUserPkg({...userPkg,image_url: e.target.files[0]})
  }
  const userPackage = async () => {
    try {

      const data = await axios.get('/getdata');
      const df = data.data;
      setUserData({ ...user, user_name: df.name, user_email: df.email });
      console.log(user)
    } catch (error) {
      console.log(error)
      history('/login')
    }
  }
  useEffect(() => {
    userPackage()
  }, [])

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserPkg({ ...userPkg, [name]: value });
  }

  const packageForm = async (e) => {
    e.preventDefault()
    try {
    const { package_name, image_url, description, price } = userPkg;
    const { user_name, user_email } = user;

    const formData = new FormData();
    formData.append("image_url", image_url,image_url.name)
    formData.append("package_name",package_name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("user_name",user_name)
    formData.append("user_email",user_email)
    console.log(userPkg)
    console.log(user)
    const res = await axios.post("/packages",formData)
    console.log(res)

    if (res.status === 201) {
      console.log("Package Sent")
      toast.success("Package Created")
      history("/home")
    } else {
      toast.error("Package Not Sent")
    }
    } catch (error) {
      console.log(error)
      toast.error("Invalid Inputs")
    }
  }



  return (
    <>
    <Navbar/>
    <ToastContainer />
      <section className="jumbotron jumbotron-fluid text-center bg-teal text-white">
        <div className="container">
          <h1 className='font-weight-bold'>Create Product</h1>
        </div>
      </section>
      <div className="container">
        <div className="createpackage-form p-5 border rounded">
          <h1 className="my-5">Create a New Package</h1>
          <form>
            <div className="form-group">
              <label for="productName">Package Name</label>
              <input onChange={handleInput} name='package_name' type="text" className="form-control" id="productName" placeholder="Enter product name" />
            </div>
            <div className="form-group">
              <label for="productDescription">Package Description</label>
              <textarea onChange={handleInput} name='description' className="form-control" id="productDescription" rows="3" placeholder="Enter product description"></textarea>
            </div>
            <div className="form-group">
              <label for="productPrice">Price</label>
              <input onChange={handleInput} name='price' type="number" className="form-control" id="productPrice" placeholder="Enter price" />
            </div>
            <div className="form-group">
              <label for="productImage">Product Image</label>
              <input onChange={uploadImage} name='image_url' type="file" className="form-control" id="productImage" />
            </div>
            <button onClick={packageForm} type="submit" className="btn btn-primary btn-block bg-dark border-dark">Create Product</button>
          </form>
        </div>
      </div>
      {/* <div>
        <input className='status-input' type="text" onChange={handleInput} name="package_name" placeholder='Package Name' />
        <input className='status-input' type="text" onChange={handleInput} name="description" placeholder='Description' />
        <input className='status-input' type="text" onChange={handleInput} name="price" placeholder='Price' />
        <input className='status-input' type="text" onChange={handleInput} name="image_url" placeholder='Image URL' />
        <button onClick={packageForm} className='status-button' type='submit'>Send</button>
      </div> */}
    </>

  )
}

export default Packages;