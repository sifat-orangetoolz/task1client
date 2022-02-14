import React, { useEffect, useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRouteBalance = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [balanceStatus, setBalanceStatus] = useState('false');

    useEffect(()=>{
        fetch(`http://localhost:5000/users/getUser/${localStorage.getItem('id')}`)
            .then((res) => res.json())
            .then((data) => {
                setBalanceStatus(data.balance>150 && data.validity_of_balance>=1);
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