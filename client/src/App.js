import React from 'react'
//import "./App.css"
import Navbar from "./components/Navbar";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
    <Navbar fixed="top"/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App