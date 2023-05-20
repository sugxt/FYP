import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Khalti from '../Payment/Khalti';
import KhaltiCheckout from "khalti-checkout-web";
import myKey from '../Payment/khaltiKey';

const BuyPackage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({name:'',email:""})
  const [userData, setUserData] = useState({message: "" });
  const [pkg, setPackage] = useState('')

  let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Name",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            let data = {
                "token": payload.token,
                "amount": payload.amount
              };
              
              let config = {
                headers: {'Authorization': myKey.secretKey}
              };
              
              axios.post("/package/buy",{token:payload.token,amount:payload.amount,key:myKey.secretKey,name:user.name,email:user.email,message:userData.message,package_id:id})
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error);
              });
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
}
  let checkout = new KhaltiCheckout(config);

  const userinfo = async () => {
    const res = await axios.get("/getdata")
    setUser({...user,name:res.data.name, email:res.data.email});
  }
  const packinfo = async () => {
    const data = await axios.get('/getpackages')
    const indPackage = data.data.packages.find(p => p._id === id)
    setPackage(indPackage)

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
    packinfo()
  }, [])
  return (
    <>
      <div>{user.name}</div>
      <div>{pkg.price}</div>
      <textarea value={userData.message} onChange={handleInput} name="message" className='status-texta' rows="5" placeholder=''></textarea>
      <button className='btn btn-sm bg-dark text-white' onClick={()=>checkout.show({amount: pkg.price})}>Pay Via Khalti</button>
    </>
  )
}

export default BuyPackage