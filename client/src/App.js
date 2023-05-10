import React, { createContext, useReducer } from 'react'
import Navbar from "./components/Navbar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Status from "./components/Status";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Packages from "./components/Packages/Packages"
import Product from "./components/Packages/IndividualPackage"
import GetPackages from './components/Packages/GetPackages';
import UpdateUser from './components/UpdateUser';
import Logout from './components/Logout';
import UpdatePackage from './components/Packages/UpdatePackage';
import Dashboard from './components/Admin/Dashboard';
import AdminPackage from './components/Admin/AdminPackage';
import AdminUser from './components/Admin/AdminUser';
import BuyPackage from './components/Packages/BuyPackage';

const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<GetPackages />} />
      <Route path="/about" element={<About />} />
      <Route path="/status" element={<Status />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/packages/add" element={<Packages />} />
      <Route path="/packages/:id" element={<Product />} />
      <Route path="/packages" element={<GetPackages />} />
      <Route path="/about/update" element={<UpdateUser />} />
      <Route path="/packages/update/:id" element={<UpdatePackage />} />
      <Route path="/packages/buy/:id" element={<BuyPackage />} />
      <Route path="/admin/dashboard" element={<Dashboard/>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin/userupdate/:id" element={<AdminUser />} />
      <Route path="/admin/packageupdate/:id" element={<AdminPackage />} />
    </Routes>
    </>
  )
}
export default App