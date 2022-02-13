import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';


const BillingHistory = () => {
    const [billings, setBillings] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/users/getUserBilling/${localStorage.getItem('id')}`)
            .then((res) => res.json())
            .then((data) => {
                setBillings(data.billing);
                // console.log(data.billing);
            });
    }, []);

    return (
    <Container className = "mt-4">
        <Row>
        {
            billings.length>0?<>
                    {
                        billings.map((billing) => (
                            <Col xs={12} md={6} className='mb-4'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Billing Info: {billing.description}</Card.Title>
                                        <Card.Text>
                                            Amount: {billing.amount}
                                        </Card.Text>
                                        <Card.Text>
                                            Date & Time: {billing.createdAt}
                                        </Card.Text>
                                </Card.Body>
                            </Card>
                          </Col> 
                        ))
                    
                
           }</>: <h2 className='text-danger'>Sorry, No Payment done</h2>}
        </Row>
            
     </Container>

    );
};

export default BillingHistory;