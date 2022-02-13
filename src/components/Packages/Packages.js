import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Packages = () => {

    const [packages, setPackages] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/packages/getPackages/`)
            .then((res) => res.json())
            .then((data) => {
                setPackages(data);
            });
    }, []);

    return (
        <Container className = "mt-4">
            <Row>
            {
                packages.length>0?<>
                   {
                     packages.map((rechargePackage) => (

                     <Col xs={12} md={6}>
                        <Card style={{ width: '18rem' }}>
                                        {/* <Card.Img variant="top" src="" /> */}
                            <Card.Body>
                                <Card.Title>Package Type: {rechargePackage.title}</Card.Title>
                                    <Card.Text>
                                        Price: {rechargePackage.amount}
                                    </Card.Text>
                                    <Card.Text>
                                        validity: {rechargePackage.validity}
                                    </Card.Text>
                                   
                                    <Link to={`/payment/${rechargePackage.id}/${rechargePackage.title}/${rechargePackage.amount}/${rechargePackage.validity}`}><Button variant="success">Buy</Button></Link>
                            </Card.Body>
                        </Card>
                      </Col> 
                    ))
                        
                    
               }</>: <h2 className='text-danger'>Sorry, No Packages Exist</h2>}



            </Row>
        </Container>
    );
};

export default Packages;