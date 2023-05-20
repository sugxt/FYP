import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar';
const AdminPackage = () => {

  const {id} = useParams();
  const [product, setProduct] = useState('');
  const [update, setUpdate] = useState({ package_name: '', price: '', description: '' });

  const getPackages = async () => {
    const res = await axios.get('/getpackages')
    const prod = res.data.packages
    const ind = prod.find(p => p._id === id)
    console.log(ind)
    setProduct(ind)
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value || e.target.defaultValue;

    setUpdate({ ...update, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault()
    const { package_name, price, description } = update;

    try {
      const success = await axios.patch('/admin/updatepackage', { package_name, price, description, id});
      if (success.status === 201) {
        window.alert("Package Updated")
      }
    } catch (error) {
      window.alert("Package Could Not Be Updated")
    }
  }

  useEffect(() => {
    getPackages()
  }, [])
  return (
    <>
      <Navbar />
      <section className="jumbotron text-center bg-teal text-white">
        <div className="container">
          <h1 className='font-weight-bold'>Update Package Information</h1>
        </div>
      </section>
      <section className='main-about'>
        <div className="container pl-20">
          <div className="row">
            <div className="col-sm-6">
              <div className="card border-rounded">
                <div className="card-body">
                  <h5 className="card-title">Update Package Information</h5>
                  <form>
                    <div className="form-group">
                      <label for="name">Package Name:</label>
                      <input className='form-control' onChange={handleInput} type="text" name='package_name' placeholder={product.package_name}/>
                    </div>
                    <div className="form-group">
                      <label for="email">Price of the Package</label>
                      <input className='form-control' onChange={handleInput} type="text" name='price' placeholder={product.price} />
                    </div>
                    <div className="form-group">
                      <label for="phone">Description:</label>
                      <textarea className='form-control' onChange={handleInput} type="text" name='description' placeholder={product.description}/>
                    </div>
                    <div className="btn-toolbar">
                    <button type='button' className='btn btn-primary mr-3 btn-block bg-dark border-dark' onClick={postData}>Update</button>
                    <button type='button' className='btn btn-primary mr-3 btn-block bg-dark border-dark' onClick={postData}>Delete</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-6 rounded bg-light p-3">
              <div className="user-info-guide">
                <h5>User Information Guide</h5>
                <ul>
                  <li><i className="fas fa-info-circle"><p className='font-weight-bold'>Please Make Sure to Edit All of The Fields Before Submitting</p></i></li>
                  <li><i className="fas fa-info-circle"></i> Provide your full name.</li>
                  <li><i className="fas fa-info-circle"></i> Enter your email address.</li>
                  <li><i className="fas fa-info-circle"></i> Provide a valid phone number.</li>
                  <li><p className="font-weight-bold"></p> Please note that you won't have access to your previous packages if you change your e-mail </li>
                </ul>
              </div>
            </div>

          </div>
        </div>




      </section>
    </>
  )
}

export default AdminPackage