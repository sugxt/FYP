import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
    // Promises
    const {state, dispatch} = useContext(UserContext)
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
            dispatch({type:"USER", payload:false})
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