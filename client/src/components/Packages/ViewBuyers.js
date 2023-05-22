import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import LoadingScreen from '../Others/LoadingScreen';

const ViewBuyers = () => {
    const [buyers, setBuyers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Make the API call to fetch the buyers data and set it in the state
        axios.get('/packages/buyers')
            .then(response => {
                setBuyers(response.data[0]);
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching buyers:', error);
            });
    }, []);
    return (
        <>
            <Navbar />
            <section className="jumbotron jumbotron-fluid text-center bg-teal text-white pd-10">
                <div className="container">
                    <h1 className='font-weight-bold'>Welcome</h1>
                    <p className="lead">These are the list of users that have bought your package</p>
                    <p className="lead">Please contact all the buyers through the email that has been provided to you</p>
                </div>
            </section>
            {isLoading ? <LoadingScreen /> : (
            <div className="container">
                <div className="row">
                    {buyers.map((buyer, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4 shadow-sm p-2">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">Buyer: {buyer.name}</h5>
                                    <p className="card-text">Email: {buyer.email}</p>
                                    <p className="card-text">{buyer.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
            
        </>

    )
}

export default ViewBuyers