import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StatusContext, UserContext } from '../../App';

const PrivateRouteBalance = ({ children, ...rest }) => {
    const [paymentStatus, setPaymentStatus] = useContext(StatusContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
              (loggedInUser && paymentStatus === "balance ok") ? (
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