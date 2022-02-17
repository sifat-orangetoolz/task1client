import React, { useEffect, useState } from 'react';
import rootApi from '../api/rootApi';


const Root = () => {
    const [ message, setMessage ] = useState('')


    useEffect(()=>{
        rootApi('GET', 'http://localhost:5000/', {})
        .then((res) => res.json())
        .then((data) => {
            setMessage(data.message);
            console.log(data)
        });
    }, []);

    return (
        <div>
            <h2>{message}</h2>
            
        </div>
    );
};

export default Root;