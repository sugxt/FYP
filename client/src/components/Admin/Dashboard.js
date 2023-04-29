import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Dashboard = () => {
    const [elements, setElements] = useState("");
    const [products, setProducts] = useState("");
    const history = useNavigate();

    const getUsers = async () => {
        try {
            const data = await axios.get("/getusers")
            setElements(data);
            console.log(data);

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
            const packdel = await axios.delete("/admin/deletepackage",{data: {id}})
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
            <body>
                <div className="container-fluid">
                    <div className="row">
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                            <div className="sidebar-sticky pt-3">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link active">
                                            <span data-feather="home"></span>
                                            Dashboard <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="file"></span>
                                            Orders
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="shopping-cart"></span>
                                            elements
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="users"></span>
                                            Customers
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="bar-chart-2"></span>
                                            Reports
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="layers"></span>
                                            Integrations
                                        </a>
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
                                        <a className="nav-link">
                                            <span data-feather="file-text"></span>
                                            Current month
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="file-text"></span>
                                            Last quarter
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="file-text"></span>
                                            Social engagement
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <span data-feather="file-text"></span>
                                            Year-end sale
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">All Packages</h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar"></span>
                                        This week
                                    </button>
                                </div>
                            </div>

                            <div className="admin-packages">
                                <div className="container">

                                    <div className="row">
                                        {
                                            products && products.data.packages.map((product) => (
                                                <div className="col-md-4">
                                                    <div className="card mb-4 shadow-sm">
                                                        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
                                                            role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                                            <title>Placeholder</title>
                                                            <rect width="100%" height="100%" fill="#7B9E7F" />
                                                        </svg>

                                                        <div className="card-body">
                                                            <h5 className="card-title">{product.package_name}</h5>
                                                            <p className="card-text">{product.description}.</p>
                                                            <p className="card-text"><small className="font-weight-bold">Price: {product.price}$</small></p>
                                                            <p className="card-text"><small className="text-muted">{product.user_name}</small></p>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="btn-toolbar">
                                                                    <button onClick={() => deletePackage(product._id)} className="btn btn-sm bg-red">Delete Package</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <h2>Users</h2>
                            <div className="table-responsive">
                                <table className="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Header</th>
                                            <th>Header</th>
                                            <th>Header</th>
                                            <th>Header</th>
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
                                                        <button className="btn btn-sm mr-3">Edit User</button>
                                                    </NavLink>
                                                        <button onClick={() => deleteUser(element._id)} className="btn btn-sm bg-red mr-3">Delete User</button>
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
        </>
    )
}

export default Dashboard