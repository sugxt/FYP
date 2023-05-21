import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  // Promises
  const history = useNavigate()
  useEffect(() => {
    fetch('/logout', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'

    }).then((res) => {
      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error;
      } else {
        localStorage.removeItem("token")
        history('/login', { replace: true })
      }
      toast.success("Successfully Logged Out", {
        toastId: 'success1',
    })
    }).catch((err) => {
      console.log(err)
    })
  });
  return (
    <>
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </>
  )
}

export default Logout