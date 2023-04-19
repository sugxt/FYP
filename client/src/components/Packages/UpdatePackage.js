import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
const UpdatePackage = () => {
    const [packageid, setPackageid] = useState({id:''})
    const [update, setUpdate] = useState({package_name:'',price:'',description:''})
    const [data, setUserData] = useState({user_email:''})
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
    const handleInput = (e) =>{
      const name = e.target.name;
      const value = e.target.value;
  
      setUpdate({...update,[name]:value});    
    }
    const postUpdate = async (e) => {
      e.preventDefault()
      const {package_name, price, description} = update;
      const id = packageid;
      const user_email = data;
      console.log(id)
      console.log(user_email)
      const success = await axios.patch('/packages/update',{package_name, price, description,id, user_email});
      console.log(success)
    }

    
    useEffect(() => {
      getEmail()
      getId()
  },[])
  return (
    <section className='main-about'>
    <h1></h1>
<input className='status-input' onChange={handleInput} type="text"  name='package_name'/>
<input className='status-input' onChange={handleInput} type="text" name='price'/>
<input className='status-input' onChange={handleInput} type="text" name='description'/>
<button className='status-button' onClick={postUpdate}>Update</button>
</section>
  )
}

export default UpdatePackage