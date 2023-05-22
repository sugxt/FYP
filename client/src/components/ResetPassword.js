import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [user, setUser] = useState({password:'',cpassword:''});
    const history = useNavigate()
    const postUpdate = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.patch('/resetpass',{password: user.password, cpassword:user.cpassword})
            if(res.status === 200){
                toast.success("Password Changed")
                localStorage.removeItem("token")
                history('/login')
            } else{
                console.log("Password Reset Failed")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
  return (
    <>
        <Navbar/>
     <section className="jumbotron text-center bg-teal text-white">
        <div className="container">
          <h1 className='font-weight-bold'>Change Your Information</h1>
        </div>
      </section>
      <section className='main-about'>
        <div className="container pl-20">
          <div className="row">
            <div className="col-sm-6">
              <div className="card border-rounded">
                <div className="card-body">
                  <h5 className="card-title">Reset Password</h5>
                  <form>
                    <div className="form-group">
                      <label for="name">Enter Your Current Password:</label>
                      <input className='form-control' onChange={handleInput} type="password" name='password'/>
                    </div>
                    <div className="form-group">
                      <label for="email">Enter Your New Password:</label>
                      <input className='form-control' onChange={handleInput} type="password" name='cpassword'/>
                    </div>
                    <button className='btn btn-primary btn-block bg-dark border-dark' onClick={postUpdate}>Reset Password</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-6 rounded bg-light p-3">
            <div className="user-info-guide">
              <h5>Reset Password Guide</h5>
              <ul>
              <li><p className='font-weight-bold'><i className="fas fa-info-circle"/>Please Make Sure to Fill All the Fields</p></li>
                <li><i className="fas fa-info-circle"></i> Enter your previous password</li>
                <li><i className="fas fa-info-circle"></i> Enter a new password</li>
                <li><p className="font-weight-bold"></p> Please make sure the password is more than 8 characters with uppercase and lowercase characters.</li>
              </ul>
            </div>
            </div>

          </div>
        </div>




      </section>
    </>
  )
}

export default ResetPassword