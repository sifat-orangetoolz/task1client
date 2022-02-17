import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
// import axios from "axios";
// import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    const [user, setUser] = useState({});
    const decoded = jwt_decode(localStorage.getItem('token'));

    useEffect(()=>{
        fetch(`http://localhost:5000/products/allProducts/${decoded.id}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    useEffect(()=>{
        fetch(`http://localhost:5000/users/getUser/${decoded.id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            });
    }, []);



    const handleClick = (product) => {
        const productToBuy =  {
            amount: product.price,
            description: product.name,
            user_id: decoded.id,
            product_id: product.id
        }

        fetch('http://localhost:5000/products/buyProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToBuy),
        })
            .then((res) => res.json())
            .then((result) => {
                    alert(result.message);
                    window.location.reload();

        })

        }
      
    return (
        <Container className = "mt-4">
            <Row>
                 <Col lg={8} md={8} sm={8}>
                     <Row>
                     {
                        products.length>0?<>
                                {
                                    products.map((product) => (
                                        <Col className='m-4'>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>Package Type: {product.name}</Card.Title>
                                                    <Card.Text>
                                                        Price: {product.price}
                                                    </Card.Text>
                                                    <Button onClick={()=>handleClick(product)} variant="success">Buy</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col> 
                                    ))
                                
                            
                    }</>: <h2 className='text-danger'>Sorry, No product Exist</h2>}

                     </Row>

                  </Col>

                  <Col lg={4} md={4} sm={4} className='mt-2'>
                        <Button className='mb-4' variant="danger" onClick={()=> {localStorage.clear(); window.location.reload();}}>Log Out</Button>
                        <h3 className='text-danger mb-4'>Current Balance</h3>
                        <h5>{user.balance} $</h5>
                  </Col>
                        
             

            </Row>
                
        </Container>


               
    );
};

export default Dashboard;


