import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    <section> </section>
    </>
  )
}

export default About