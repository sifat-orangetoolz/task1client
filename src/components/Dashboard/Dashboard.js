import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import rootApi from '../api/rootApi';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [balance, setBalance] = useState('');
    const [userId, setUserId] = useState('');
    const history = useHistory();


    useEffect(()=>{
            rootApi('GET', 'http://localhost:5000/products/allProducts')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
                setBalance(data.balance);
                setUserId(data.userId);
                if(data.balance<100){
                    history.push('/packages')
                }

            });
    }, []);


    const handleClick = (product) => {
        const productToBuy =  {
            amount: product.price,
            description: product.name,
            product_id: product.id
        }

        fetch('http://localhost:5000/products/buyProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
            'authorization': `bearer ${localStorage.getItem('token')}`    
            },
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
                        <Button className='mb-4' variant="danger" onClick={()=> {localStorage.clear();  window.location.reload();}}>Log Out</Button>
                        <h3 className='text-danger mb-4'>Current Balance</h3>
                        <h5>{balance} $</h5>
                  </Col>
                        
             

            </Row>
                
        </Container>


               
    );
};

export default Dashboard;


