import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { UserContext } from '../../App';

const Login = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ error, setError ] = useState('')

    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleLogin = (e)=>{
        e.preventDefault();

        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password}),
        })

        .then((res) => res.json())
        .then((result) => {
            if(result.token) {
                alert(result.message);

                // localStorage.setItem('id', result.user.id);
                // localStorage.setItem('email', result.user.email);
                localStorage.setItem('token', result.token);

                // setLoggedInUser(result.user.email)
                setError('')

                history.push('/dashboard')
            }

            else if(result.message){
                setError(result.message);       
            }
            else{
                alert('Invalid email or password');
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

                        { error && <p className='text-danger'>{error}</p>}
                        <div className="d-flex justify-content-center"> 
                        <input type="submit" value="Log In" className="btn btn-dark" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;