import React, { useEffect, useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
const Dashboard = () => {
    const [Products, setProducts] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/products/allProducts`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);
    console.log(Products)

    return (
        <div>
                {
                    Products.length>0?<>
                        {
                            Products.map((product) => (
                                // console.log(product)
                                // <h2>{product.name}</h2>
                                <div>
                                    <h2>{product.name}</h2>
                                    <h4>{product.price}</h4>
                                </div>   
                            ))
                        
                    
               }</>: <h2>No product Exist</h2>}
        </div>


               
    );
};

export default Dashboard;


