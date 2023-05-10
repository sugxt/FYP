import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar'
import LoadingScreen from '../Others/LoadingScreen';
import Logo from '/Git/FYP/client/src/images/eKalahWhite.png'
import { Card } from 'react-bootstrap';

const Dashboard = () => {
    const [elements, setElements] = useState("");
    const [products, setProducts] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [countUser, setCountUser] = useState('')
    const [countPackage, setCountPackage] = useState('')
    const history = useNavigate();

    const getUsers = async () => {
        try {
            const data = await axios.get("/getusers")
            setElements(data);
            console.log(data);
            setCountUser(data.data.users.length)
        } catch (error) {
            console.log(error)
        }

    }
    const deleteUser = async (id) => {
        try {
            const del = await axios.delete('/admin/deleteuser', { data: { id } })
            console.log(del)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    const deletePackage = async (id) => {
        try {
            const packdel = await axios.delete("/admin/deletepackage", { data: { id } })
            console.log(packdel)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const callPackages = async () => {

        try {
            const data = await axios.get('/getpackages');
            console.log(data);
            setProducts(data);
            setCountPackage(data.data.packages.length)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            history("/")
        }
    }

    useEffect(() => {
        getUsers()
        callPackages()
        console.log(elements)
    }, [])
    return (

        <>
            <div>
                {isLoading ? <LoadingScreen /> : (
                    <div>
                        <body>
                            <div className="container-fluid">
                                <div className="row">
                                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
                                        <div className="sidebar-sticky pt-3">
                                            <ul className="nav flex-column">
                                                <li className="nav-item">
                                                    <a className="nav-link text-white active">
                                                        <span data-feather="home"></span>
                                                        <NavLink className="navbar-brand" to="/"><img src={Logo} alt="Logo" width={90} height={35} /></NavLink>
                                                    </a>
                                                </li>
                                                <hr className="mt-0 mb-4 bg-white" />
                                                <li className="nav-item">
                                                    <NavLink to="/home" className="nav-link text-white">
                                                        <span data-feather="file"></span>
                                                        Home
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink to="/home" className="nav-link text-white">
                                                        <span data-feather="file"></span>
                                                        Users
                                                    </NavLink>
                                                </li> <li className="nav-item">
                                                    <NavLink to="/home" className="nav-link text-white">
                                                        <span data-feather="file"></span>
                                                        Packages
                                                    </NavLink>
                                                </li> <li className="nav-item">
                                                    <NavLink to="/logout" className="nav-link text-white">
                                                        <span data-feather="file"></span>
                                                        Log Out
                                                    </NavLink>
                                                </li>
                                            </ul>

                                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                                <span>Saved reports</span>
                                                <a className="d-flex align-items-center text-muted" aria-label="Add a new report">
                                                    <span data-feather="plus-circle"></span>
                                                </a>
                                            </h6>
                                            <ul className="nav flex-column mb-2">
                                                <li className="nav-item">
                                                    <a className="nav-link text-white">
                                                        <span data-feather="file-text"></span>
                                                        Current month
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link text-white">
                                                        <span data-feather="file-text"></span>
                                                        Last quarter
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link text-white">
                                                        <span data-feather="file-text"></span>
                                                        Social engagement
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link text-white">
                                                        <span data-feather="file-text"></span>
                                                        Year-end sale
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>

                                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                            <h1 className="h2 font-weight-bold">Stats</h1>
                                        </div>
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <Card className='mr-3 bg-dark border-rounded' style={{ width: '400px', height: '300px' }}>
                                                    <Card.Body className='justify-content-center'>
                                                        <Card.Title className='text-white'>Users</Card.Title>
                                                        <hr className="mt-0 mb-4" />
                                                        <Card.Text className="display-1 font-weight-bold mr-3 text-white">{countUser}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card className='bg-dark border-rounded' style={{ width: '400px', height: '300px' }}>
                                                    <Card.Body className='justify-content-center'>
                                                        <Card.Title className='text-white'>Packages</Card.Title>
                                                        <hr className="mt-0 mb-4" />
                                                        <Card.Text className="display-1 font-weight-bold mr-3 text-white">{countPackage}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                            <h1 className="h2 font-weight-bold">All Packages</h1>
                                        </div>

                                        <div className="admin-packages">
                                            <div className="container">

                                                <div className="row">
                                                    {
                                                        products && products.data.packages.map((product) => (
                                                            <div className="col-md-4">
                                                                <div className="card mb-4 shadow-sm p-2">
                                                                    <img src={`http://localhost:5000/public/images/${product.image_url}`} className="card-img-top border-white" alt="..." height="200" width="200" />

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{product.package_name}</h5>
                                                                        <p className="card-text">{product.description}.</p>
                                                                        <p className="card-text"><small className="font-weight-bold">Price: {product.price}$</small></p>
                                                                        <p className="card-text"><small className="text-muted">{product.user_name}</small></p>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="btn-toolbar">
                                                                                <button onClick={() => deletePackage(product._id)} className="btn btn-sm border-danger text-danger">Delete Package</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>

                                        <h2 className='font-weight-bold'>Users</h2>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone Number</th>
                                                        <th>Role</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        elements && elements.data.users.map((element) => (
                                                            <tr>
                                                                <td>{element.name}</td>
                                                                <td>{element.email}</td>
                                                                <td>{element.phone}</td>
                                                                <td>{element.role}</td>
                                                                <td><NavLink to={`/admin/userupdate/${element._id}`}>
                                                                    <button className="btn btn-sm mr-3 border-dark">Edit User</button>
                                                                </NavLink>
                                                                    <button onClick={() => deleteUser(element._id)} className="btn btn-sm border-danger text-danger">Delete User</button>
                                                                </td>
                                                            </tr>
                                                        ))

                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </body>
                    </div>
                )}
            </div>

        </>
    )
}

export default Dashboard