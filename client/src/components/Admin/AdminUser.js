import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar';
import { toast } from 'react-toastify';

const AdminUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [info, setInfo] = useState({ name: '', email: '', phone: '', role: '' })


  const getUser = async () => {
    const res = await axios.get('/getusers')
    const prod = res.data.users
    const indPackage = prod.find(p => p._id === id)
    setUser(indPackage)
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  }
  const postUpdate = async (e) => {
    e.preventDefault()
    const { name, email, phone, role } = user;
    try {
      const success = await axios.patch('/admin/updateuser', { name, email, phone, id, role });
      console.log(success)
      if (success.status === 201) {
        toast.success("User Updated")
      }
    } catch (error) {
      console.log(error)
    }


  }


  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <Navbar />
      <section className="jumbotron jumbotron-fluid text-center bg-teal text-white">
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
                      <label htmlFor="name">Name:</label>
                      <input className="form-control" onChange={handleInput} type="text" name="name" defaultValue={user.name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input className="form-control" onChange={handleInput} type="email" name="email" defaultValue={user.email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone:</label>
                      <input className="form-control" onChange={handleInput} type="number" name="phone" defaultValue={user.phone} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role:</label>
                      <input className="form-control" onChange={handleInput} type="text" name="role" defaultValue={user.role} />
                    </div>
                    <button className="btn btn-primary btn-block bg-dark border-dark" onClick={postUpdate}>Update</button>
                  </form>

                </div>
              </div>
            </div>
            <div className="col-sm-6 rounded bg-light p-3">
              <div className="user-info-guide">
                <h5>User Information Guide</h5>
                <ul>
                  <li><i className="fas fa-info-circle"></i> Provide the User's full name.</li>
                  <li><i className="fas fa-info-circle"></i> Enter a proper email address</li>
                  <li><i className="fas fa-info-circle"></i> Provide a valid phone number.</li>
                  <li><p className='font-weight-bold'><i className="fas fa-info-circle"></i> Please ensure that roles are set to either "admin" or "Freelancer"</p>  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>




      </section>
    </>
  )
}

export default AdminUser