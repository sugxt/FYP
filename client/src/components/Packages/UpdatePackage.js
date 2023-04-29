import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
const UpdatePackage = () => {
  const [packageid, setPackageid] = useState({ id: '' })
  const [update, setUpdate] = useState({ package_name: '', price: '', description: '' })
  const [data, setUserData] = useState({ user_email: '' })
  const [product, setProduct] = useState("");
  const { id } = useParams();

  const getEmail = async () => {
    try {
      const res = await axios.get('/getdata');
      const data = res.data.email;
      setUserData(data);
    } catch (error) {
      console.log(error)
    }
  }
  const getId = async () => {
    setPackageid(id)

  }
  const getPackage = async () => {
    const res = await axios.get('/getpackages')
    const prod = res.data.packages
    const indPackage = prod.find(p => p._id === id)
    setProduct(indPackage)
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdate({ ...update, [name]: value });
  }
  const postUpdate = async (e) => {
    e.preventDefault()
    const { package_name, price, description } = update;
    const id = packageid;
    const user_email = data;
    console.log(id)
    console.log(user_email)

    try {
      const success = await axios.patch('/packages/update', { package_name, price, description, id, user_email });
      if (success.status === 200) {
        window.alert("Package Updated")
      }
    } catch (error) {
      window.alert("Package Could Not Be Updated")
    }

  }

  useEffect(() => {
    getPackage()
    getEmail()
    getId()
  }, [])
  return (
    <>
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
                      <input className='form-control' onChange={handleInput} type="text" name='package_name' defaultValue={product.package_name} />
                    </div>
                    <div className="form-group">
                      <label for="email">Price of the Package</label>
                      <input className='form-control' onChange={handleInput} type="text" name='price' defaultValue={product.price} />
                    </div>
                    <div className="form-group">
                      <label for="phone">Description:</label>
                      <textarea className='form-control' onChange={handleInput} type="text" name='description' defaultValue={product.description} />
                    </div>
                    <button className='status-button' onClick={postUpdate}>Update</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-6 rounded bg-light p-3">
            <div className="user-info-guide">
              <h5>User Information Guide</h5>
              <ul>
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
    // <section className='main-about'>
    //   <input className='status-input' onChange={handleInput} type="text" name='package_name' />
    //   <input className='status-input' onChange={handleInput} type="text" name='price' />
    //   <input className='status-input' onChange={handleInput} type="text" name='description' />
    //   <button className='status-button' onClick={postUpdate}>Update</button>
    // </section>
  )
}

export default UpdatePackage