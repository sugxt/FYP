import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import LoadingScreen from '../Others/LoadingScreen';

const ViewSold = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Fetch products from the server
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/packages/sellers');
                setProducts(response.data);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            {isLoading ? <LoadingScreen /> : (
                <div>
                    <section className="jumbotron jumbotron-fluid text-center bg-teal text-white pd-10">
                        <div className="container">
                            <h1 className='font-weight-bold'>Inventory</h1>
                            <p className="lead">This is the list of packages you have bought</p>
                        </div>
                    </section>
                    <div className="container">
                        <div className="row">
                            {products.map((product) => (
                                <div className="col-md-4" key={product._id}>
                                    <div className="card mb-4 shadow-sm p-2">
                                        <img
                                            src={`http://localhost:5000/public/images/${product.image_url}`}
                                            className="card-img-top border-white"
                                            alt="..."
                                            height="200"
                                            width="200"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.package_name}</h5>
                                            <p className="card-text">{product.description}.</p>
                                            <p className="card-text">
                                                <small className="font-weight-bold">
                                                    Price: Rs.{product.price}
                                                </small>
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">{product.user_name}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>)}
        </>
    );
};

export default ViewSold;
