import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import rootApi from '../api/rootApi';



const Packages = () => {

    const [packages, setPackages] = useState([]);
    const [balance, setBalance] = useState('');
    const history = useHistory();

    
    // const [user, setUser] = useState({});
    // const decoded = jwt_decode(localStorage.getItem('token'));

    // useEffect(()=>{
    //     // fetch(`http://localhost:5000/users/getUser/${decoded.id}`)
    //         rootApi('GET', 'http://localhost:5000/users/getUser', {})
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setUser(data);
    //         });
    // }, []);

    useEffect(()=>{
         rootApi('GET', 'http://localhost:5000/packages/getPackages')
            .then((res) => res.json())
            .then((data) => {
                setPackages(data.data);
                setBalance(data.userBalance)
            });
    }, []);

    return (
        <Container className = "mt-4">
            <Row>
                <Col lg={8} md={8} sm={8}>
                  <Row>
                    {
                        packages.length>0?<>
                        {
                            packages.map((rechargePackage) => (

                            <Col xs={12} md={6}>
                                <Card style={{ width: '18rem' }}>
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
                  
                
                </Col>
                <Col lg={4} md={4} sm={4}>
                <Button className='mb-4' variant="danger" onClick={()=> {localStorage.clear(); history.push("/login"); window.location.reload();}}>Log Out</Button>
                    <h3 className='mb-4 text-danger'>Current Balance</h3>
                    <h5>{balance} $</h5>
                
                </Col>



            </Row>
        </Container>
    );
};

export default Packages;