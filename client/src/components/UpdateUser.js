import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/about.css"
import axios from 'axios'
const UpdateUser = () => {

  const history = useNavigate();
  const [user, setUserData] = useState({name:'', email:'',phone:''});
  const [update, setUpdate] = useState({name:'', email:'',phone:''});

  const getUserData = async () => {

    try {
      const res = await axios.get('/getdata');
      const data = res.data;
      setUserData({...user, name: data.name, email: data.email, phone:data.phone});
    } catch (error) {
      console.log(error)
    }
  }
  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUpdate({...update,[name]:value});    
  }

  const postUpdate = async (e) => {
    e.preventDefault()
    const {name, email, phone} = update;
    console.log(update)
    const success = await axios.patch('/updateuser',update)
    console.log(success)
    window.alert(success)
  }

  useEffect(() => {
      getUserData()
  },[])



  return (
    <>
    <section className='main-about'>
        <h1></h1>
    <input className='status-input' onChange={handleInput} type="text"  name='name' defaultValue={user.name}/>
    <input className='status-input' onChange={handleInput} type="email" name='email' defaultValue={user.email}/>
    <input className='status-input' onChange={handleInput} type="number" name='phone' defaultValue={user.phone}/>
    <button className='status-button' onClick={postUpdate}>Update</button>
    </section>
    </>
  )
}


export default UpdateUser