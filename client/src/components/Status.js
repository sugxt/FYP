import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Status = () => {
  const history = useNavigate();
  const [userData, setUserData] = useState({name:"", email:"", message:""});

  const userContact = async () => {

    try {
      const res = await fetch('/getdata',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData,name:data.name, email:data.email, message:data.message});

      if (!res.status === 200){
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error)
      history("/login")
    }
  }

  useEffect(() => {
      userContact()
  },[])
  // Storing data in state

  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData,[name]:value});    
  }

  // Sending the data to backend
const statusForm = async (e) =>{
  e.preventDefault()
  const {name, email, message} = userData;

  const res = await fetch('/status', {
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, email, message
    })
  });

  const data = await res.json()

  if(!data){
    console.log("Message not Sent")
  } else {
    alert("Message Sent")
    setUserData({...userData, message:""})
  }

}

  return (
    <>
    <body className='status-body'>
      <div className="status-container">
        <h1>Apply For Client Status</h1>
        <p>Fill the form below to apply as client. This is required in order to purchase
          packages.</p>
          <div className="status-contact">
            <div className="status-contact-left">
                <h3> Send Request for Client</h3>
                <form method='POST'>
                  <div className="status-input-row">
                    <div className="input-group">
                      <label> Name</label>
                      <input className='status-input' type="text" onChange={handleInput} name="name" value={userData.name} />
                    </div>
                  </div>
                  <div className="status-input-row">
                    <div className="input-group">
                      <label> E-Mail</label>
                      <input className='status-input' type="email" onChange={handleInput} name="email" value={userData.email} />
                    </div>
                  </div>
                  <label className='status-label'>Application</label>
                  <textarea value={userData.message} onChange={handleInput} name="message" className='status-texta' rows="5" placeholder=''></textarea>
                  <button onClick={statusForm} className='status-button' type='submit'>Send</button>
                </form>
            </div>
            <div className="status-contact-right">
              <h3>Reach Us</h3>
            </div>
          </div>
      </div>
    </body>
    </>
  )
}

export default Status