import React, { useEffect } from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Packages = () => {
  const history = useNavigate();
  const [user, setUserData] = useState({user_name:'',user_email:''});
  const [userPkg, setUserPkg] = useState({package_name:"",image_url:"",description:"",price:""});


  const userPackage = async () =>{
    try{

      const data = await axios.get('/getdata');
      const df = data.data;
      setUserData({...user,user_name:df.name,user_email:df.email});
      console.log(user)
    }catch(error){
      console.log(error)
      history('/login')
    }
  }
  useEffect(() => {
    userPackage()
  }, [])
   
  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserPkg({...userPkg,[name]:value});    
  }

  const packageForm = async (e) => {
    e.preventDefault()
    const {package_name,image_url,description, price} = userPkg;
    const {user_name, user_email} = user;
    console.log(userPkg)
    console.log(user)
    const res = await fetch('/packages', {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        package_name, user_name, user_email,image_url,description, price
      })
    });

    const data = await res.json()

    if (!data) {
      console.log("Package Not Sent")
    }else{
      console.log("Package Sent")
      console.log("")
    }
  }



    return(
        <>
        <div>
        <input className='status-input' type="text" onChange={handleInput} name="package_name" placeholder='Package Name' />
        <input className='status-input' type="text" onChange={handleInput} name="description" placeholder='Description' />
        <input className='status-input' type="text" onChange={handleInput} name="price" placeholder='Price' />
        <input className='status-input' type="text" onChange={handleInput} name="image_url" placeholder='Image URL' />
        <button onClick={packageForm} className='status-button' type='submit'>Send</button>
        </div>
        </>

    )
}

export default Packages;