import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    // Promises
    const history = useNavigate()
    useEffect(() => {
        fetch('/logout',{
            method: 'GET',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials:'include'
    
          }).then((res) => {
            history('/login',{replace: true})
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error;
            }else{
              console.log("Logged Out")
              localStorage.removeItem("token")
            }
          }).catch((err) => {
            console.log(err)
          })
    });
    return(
        <>
            <h1>Logout Page</h1>
        </>
    )
}

export default Logout