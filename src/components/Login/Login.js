import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' }}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleLogin = (e)=>{
        e.preventDefault();

        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password}),
        })

        .then((res) => res.json())
        .then((result) => {
            console.log(result)
            if(result.user.email) {
                alert(result.message);

                localStorage.setItem('id', result.user.id);
                localStorage.setItem('email', result.user.email);

                setLoggedInUser(result.user.email)

                history.push(from)
                // window.location.reload();
            }
            else if(result.message==='Login failed! Please try again.') {
                alert(result.message);
            }
            else{
                alert('Invalid username or password');
                
            }
         })

        
    }

    return (
        <section className="container my-5">
 
            <h3 className="text-danger text-center mb-4">Log In</h3>
            <div className="d-flex justify-content-center"> 
                <div className="login-panel">
                    <form onSubmit={handleLogin}>
                        <label className="mb-2" htmlFor="email">Email:</label><br />
                        <input type="email" id="email" placeholder="Email" className="form-control mb-3" onChange={(e)=> setEmail(e.target.value)} required/>
                        <label className="mb-2" htmlFor="password">Password:</label><br />
                        <input type="password" id="password" placeholder="Password" className="form-control mb-3" onChange={(e)=> setPassword(e.target.value)} required/>
                        <div className="d-flex justify-content-center"> 
                        <input type="submit" value="Log In" className="login-btn" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;