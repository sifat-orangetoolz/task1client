import React, { useEffect, useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';
import jwt_decode from 'jwt-decode';

const PrivateRouteBalance = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [balanceStatus, setBalanceStatus] = useState('false');
    
    var decoded = jwt_decode(localStorage.getItem('token'));

    let date = new Date();

    useEffect(()=>{
        fetch(`http://localhost:5000/users/getUser/${localStorage.getItem('id')}`)
            .then((res) => res.json())
            .then((data) => {

                setBalanceStatus(data.balance !==null && data.balance>=100 && ((new Date(data.validity_of_balance)).getTime()>=date.getTime())&& data.validity_of_balance!==null);
            });
    }, []);

    return (
        <Route
            {...rest}
            render={({ location }) =>
              (loggedInUser && balanceStatus ) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/packages',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRouteBalance;