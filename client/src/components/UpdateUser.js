import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
const UpdateUser = () => {

  const history = useNavigate();
  const [user, setUserData] = useState({ name: '', email: '', phone: '' });
  const [update, setUpdate] = useState({ name: '', email: '', phone: '' });

  const getUserData = async () => {

    try {
      const res = await axios.get('/getdata');
      const data = res.data;
      setUserData({ ...user, name: data.name, email: data.email, phone: data.phone });
    } catch (error) {
      console.log(error)
    }
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdate({ ...update, [name]: value });
  }

  const postUpdate = async (e) => {
    e.preventDefault()
    const { name, email, phone } = update;
    console.log(update)
    try {
      const success = await axios.patch('/updateuser', update)
      if (success.status === 200) {
        window.alert("User Updated")
      }
    } catch (error) {
      window.alert("Could Not Update User")
    }

  }

  useEffect(() => {
    getUserData()
  }, [])



  return (
    <>
      <section className="jumbotron text-center bg-teal text-white">
        <div className="container">
          <h1 className='font-weight-bold'>Update User Information</h1>
        </div>
      </section>
      <section className='main-about'>
        <div className="container pl-20">
          <div className="row">
            <div className="col-sm-6">
              <div className="card border-rounded">
                <div className="card-body">
                  <h5 className="card-title">Update User Information</h5>
                  <form>
                    <div className="form-group">
                      <label for="name">Name:</label>
                      <input className='form-control' onChange={handleInput} type="text" name='name' defaultValue={user.name} />
                    </div>
                    <div className="form-group">
                      <label for="email">Email:</label>
                      <input className='form-control' onChange={handleInput} type="email" name='email' defaultValue={user.email} />
                    </div>
                    <div className="form-group">
                      <label for="phone">Phone:</label>
                      <input className='form-control' onChange={handleInput} type="number" name='phone' defaultValue={user.phone} />
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
  )
}


export default UpdateUser