import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';


// import { UserContext } from '../../App';

const PrivateRouteUser = ({ children, ...rest }) => {
// const [loggedInUser, setLoggedInUser] = useContext(UserContext);
// const decoded = jwt_decode(localStorage.getItem('token'));
const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token !== null ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRouteUser;