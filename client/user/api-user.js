

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
                'Authorization': 'Bearer ' + credential
            },
            body : user
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


const follow = async(id,credential,followId)=>{
    console.log('follow api')
    try{
        let response = await fetch('/api/follow',{
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential
            },
            body : JSON.stringify({
                userId : id,
                followId: followId

            })
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

const unfollow = async(id,credential,unfollowId)=>{
    try{
        let response = await fetch('/api/unfollow',{
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential
            },
            body : JSON.stringify({
                userId : id,
                followId: unfollowId

            })
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

const peoplefind = async(id,credential,signal)=>{
    try{
        let response = await fetch('/api/findpeople/'+id,{
            method: 'GET',
            signal: signal,
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential
            }
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}
export {create,list,read,update,remove,follow,unfollow,peoplefind}