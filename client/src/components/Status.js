import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Status = () => {
  const history = useNavigate();
  const [user, setUserData] = useState({});

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
      setUserData(data);

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
                <form>
                  <div className="status-input-row">
                    <div className="input-group">
                      <label> Name</label>
                      <input className='status-input' type="text" value={user.name} />
                    </div>
                  </div>
                  <div className="status-input-row">
                    <div className="input-group">
                      <label> E-Mail</label>
                      <input className='status-input' type="email" value={user.email} />
                    </div>
                  </div>
                  <label className='status-label'>Application</label>
                  <textarea className='status-texta' rows="5" placeholder=''></textarea>
                  <button className='status-button' type='submit'>Send</button>
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