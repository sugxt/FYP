import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/about.css"
const About = () => {

  const history = useNavigate();
  const [user, setUserData] = useState({});

  const callAboutPage = async () => {

    try {
      const res = await fetch('/about',{
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:'include'

      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200){
        throw new Error(res.error);
      }
    } catch (error) {
      //console.log(error)
      history("/login")
    }
  }

  useEffect(() => {
      callAboutPage()
  },[])



  return (
    <>
    <section className='main-about'>
      <body className='about-body'>
        <div className="about-card">
          <div className="imagpx"><img src={user.photo}height={150} width={150} alt="User"/></div>
          <div className="content">
            <div className="details">
              <h2>{user.name}<br/><span>{user.role}</span></h2>
              <div className="data">
                <h3>Email<br/><span>{user.email}</span></h3>
                <h3>Phone<br/><span>{user.phone}</span></h3>
              </div>
              <div className="actionBtn">
                <button>View Packages</button>
                <button>Home</button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </section>
    </>
  )
}

export default About