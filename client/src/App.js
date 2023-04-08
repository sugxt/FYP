import React, { createContext, useReducer } from 'react'
//import "./App.css"
import Navbar from "./components/Navbar";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import Status from "./components/Status";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Packages from "./components/Packages/Packages"
import GetPackages from './components/Packages/GetPackages';
import Logout from './components/Logout';
import { initialState, reducer } from './reducer/useReducer';

const UserContext = createContext();


const Routing = () =>{
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/status" element={<Status />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path ="/packages" element={<Packages/>}/>
    <Route path ="/getpackages" element={<GetPackages/>}/>
    <Route path ="/logout" element={<Logout/>}/>
    </Routes>
  )
}

const App = () => {
  // Context API
  const [state,dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar fixed="top"/>
    <Routing/>
    </UserContext.Provider>
    </>
  )
}
export {UserContext}
export default App