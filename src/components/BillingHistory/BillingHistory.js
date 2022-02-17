import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
// import jwt_decode from 'jwt-decode';
import "./BillingHistory.css"
import rootApi from '../api/rootApi';


const BillingHistory = () => {
    const [billings, setBillings] = useState([]);
    // const decoded = jwt_decode(localStorage.getItem('token'));

    useEffect(()=>{
        // fetch(`http://localhost:5000/users/getUserBilling`)
            rootApi('GET', 'http://localhost:5000/users/getUserBilling')
            .then((res) => res.json())
            .then((data) => {
                setBillings(data.billing);
            });
    }, []);

    return (
    <Container className = "mt-4">
        <h2>Billing History </h2>

        <div className="Group-list">
            <div className="grouplist-table">
                <table>
                        <tr>
                        <th>Payment Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        </tr>
                        
                            {
                                billings.map(billing=> <>
                                    <tr>
                                        <td>{billing.description}</td>
                                        <td>{billing.amount}</td>
                                        <td>{billing.createdAt}</td>
                                    </tr>
                                </>)
                            }

                        
                    </table>
            </div>
        </div>
            
     </Container>

    );
};

export default BillingHistory;