function rootApiPost(method, url, data){
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 
                   'authorization': `bearer ${localStorage.getItem('token')}`    
                 },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())


}

export default rootApiPost;