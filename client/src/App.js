import React from 'react'
//import "./App.css"
import Navbar from "./components/Navbar";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import Status from "./components/Status";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Packages from "./components/Packages";

const App = () => {
  return (
    <>
    <Navbar fixed="top"/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/status" element={<Status />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path ="/packages" elements={<Packages/>}/>
    </Routes>
    </>
  )
}

export default App