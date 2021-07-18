

const create = async(user)=>{
    try{
        let response = await fetch('/api/users',{
            method : "POST" ,
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(user)
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

const list = async(signal)=>{
    try{
        let response = await fetch('/api/users',{
            method: 'GET',
            signal : signal ,
        })
        return  await response.json()
    }catch(e){
        console.log(e)
    }
}

const read = async(id,jwt,signal) => {
    try{
        let response = await fetch('/api/users/'+ id,{
            method: "GET",
            signal: signal,
            headers : {
                'Accept'  : 'application/json' ,
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + jwt
            }
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

const update = async(id,credential,user)=>{
    try{
        let response = await fetch('/api/users/'+id,{
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + credential
            },
            body : JSON.stringify(user)
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}


const remove = async(id,credential)=>{
    try{
        let response = await fetch('/api/users/'+id,{
            method : 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + credential
            }
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

export {create,list,read,update,remove}