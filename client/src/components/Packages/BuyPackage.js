import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Khalti from '../Payment/Khalti';
import KhaltiCheckout from "khalti-checkout-web";
import myKey from '../Payment/khaltiKey';
import Navbar from '../Navbar';
import LoadingScreen from '../Others/LoadingScreen';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuyPackage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: "" })
  const [userData, setUserData] = useState({ message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [pkg, setPackage] = useState('')

  let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Name",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        let data = {
          "token": payload.token,
          "amount": payload.amount
        };

        let config = {
          headers: { 'Authorization': myKey.secretKey }
        };

        axios.post("/package/buy", { token: payload.token, amount: payload.amount, key: myKey.secretKey, name: user.name, email: user.email, message: userData.message, package_id: id ,seller_email:pkg.user_email })
          .then(response => {
            if(response.status === 201){
              toast.success("Package Successfully Bought")
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  }
  let checkout = new KhaltiCheckout(config);

  const userinfo = async () => {
    const res = await axios.get("/getdata")
    setUser({ ...user, name: res.data.name, email: res.data.email });
  }
  const packinfo = async () => {
    const data = await axios.get('/getpackages')
    const indPackage = data.data.packages.find(p => p._id === id)
    setPackage(indPackage)
    setIsLoading(false)

  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault()
    const { message } = userData;
    const { name, email } = user;
    const package_id = id;

    const res = await fetch('/buypackage', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, message, package_id
      })
    });

    const data = await res.json()

    if (!data) {
      console.log("Message not Sent")
    } else {
      alert("Message Sent")
      setUserData({ ...userData, message: "" })
      console.log(userData)
    }
  }
  useEffect(() => {
    userinfo()
    packinfo()
  }, [])
  return (
      <>
        <Navbar />
        {isLoading ? <LoadingScreen /> : (
          <div>
        <section className="jumbotron jumbotron-fluid text-center bg-teal text-white">
          <div className="container">
            <h1 className="font-weight-bold">Buy Package</h1>
          </div>
        </section>
        <section className="main-about">
          <div className="container pl-20">
            <div className="row">
              <div className="col-sm-6">
                <div className="card border-rounded">
                  <div className="card-body">
                    <h5 className="card-title">Send a message to your Freelancer</h5>
                    <form>
                      <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea onChange={handleInput} name="message" className='status-texta' rows="5" placeholder='' defaultValue={`${pkg.package_name}:`}></textarea>
                      </div>
                      <button className='btn btn-sm bg-dark text-white' onClick={(e) => {
                        e.preventDefault();
                        checkout.show({ amount: pkg.price *100 });
                      }}>Pay Via Khalti</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 rounded bg-light p-3">
                <div className="user-info-guide">
                  <h5>Payment Guide</h5>
                  <ul>
                    <li><i className="fas fa-info-circle"></i> Please send a proper message to the freelancer stating what you want</li>
                    <li><i className="fas fa-info-circle"></i> You'll get the freelancer's email sent to you via email for further contact about the package</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
        )}
      </>
  )
}

export default BuyPackage