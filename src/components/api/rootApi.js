function rootApi(method, url){
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 
                   'authorization': `bearer ${localStorage.getItem('token')}`    
                 },
        // body: JSON.stringify(data)
    })

}

export default rootApi;