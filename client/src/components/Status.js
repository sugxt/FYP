import React from 'react'
import { useState, useEffect } from 'react';

const Status = () => {

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
      //console.log(error)
      //history("/login")
    }
  }

  useEffect(() => {
      userContact()
  },[])



  return (
    <>
    <section className=''>
      <h1>{user.name}</h1>

    </section>
    
    </>
  )
}

export default Status