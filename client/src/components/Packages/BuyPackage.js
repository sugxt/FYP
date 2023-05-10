import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const BuyPackage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({name:'',email:""})
  const [userData, setUserData] = useState({message: "" });

  const userinfo = async () => {
    const res = await axios.get("/getdata")
    setUser({...user,name:res.data.name, email:res.data.email});
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault()
    const {message} = userData;
    const {name,email} = user;
    const package_id = id;
    
    const res = await fetch('/buypackage', {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, message, package_id
      })
    });
  
    const data = await res.json()
  
    if(!data){
      console.log("Message not Sent")
    } else {
      alert("Message Sent")
      setUserData({...userData, message:""})
      console.log(userData)
    }
  }
  useEffect(() => {
    userinfo()
  }, [])
  return (
    <>
      <div>{user.name}</div>
      <textarea value={userData.message} onChange={handleInput} name="message" className='status-texta' rows="5" placeholder=''></textarea>
      <button onClick={postData} className='status-button' type='submit'>Send</button>
    </>
  )
}

export default BuyPackage