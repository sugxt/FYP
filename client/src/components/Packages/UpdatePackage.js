import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
const UpdatePackage = () => {
    const [packageid, setPackageid] = useState({id:''})
    const [update, setUpdate] = useState({package_name:'',price:'',description:''})
    const [data, setUserData] = useState({user_email:''})
    const { id } = useParams();
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
      console.log(id)
      console.log(update)
      const success = await axios.patch('/packages/update',{package_name, price, description,id});
      console.log(success)
    }

    
    useEffect(() => {
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