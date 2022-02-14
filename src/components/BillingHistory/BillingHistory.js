import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import "./BillingHistory.css"


const BillingHistory = () => {
    const [billings, setBillings] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/users/getUserBilling/${localStorage.getItem('id')}`)
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