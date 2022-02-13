import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/products/allProducts`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    return (
        <Container className = "mt-4">
            <Row>
            {
                products.length>0?<>
                        {
                            products.map((product) => (
                                <Col xs={12} md={6}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Package Type: {product.name}</Card.Title>
                                            <Card.Text>
                                                Price: {product.price}
                                            </Card.Text>
                                            <Link to={`/productPayment/${product.id}/${product.name}/${product.price}`}><Button variant="success">Buy</Button></Link>
                                    </Card.Body>
                                </Card>
                              </Col> 
                            ))
                        
                    
               }</>: <h2 className='text-danger'>Sorry, No product Exist</h2>}
            </Row>
                
        </Container>


               
    );
};

export default Dashboard;


