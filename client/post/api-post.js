

const creatPost = async(id,credential,post)=>{
    try{
        let response = await fetch('/api/posts/new/'+id,{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Authorization': 'Bearer ' + credential
            },
            body : post
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

const listNewFeed = async(id,jwt,signal) => {
    try{
        let response = await fetch('/api/posts/feed/'+ id,{
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

const postByUser = async(id,jwt) => {
    try{
        let response = await fetch('/api/post/byUser/'+id,{
            method: "GET",
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

const postLike = async(postId,credential,userId) => {
    try{

        let response = await fetch('/api/post/like',{
            method: "PUT",
            headers : {
                'Accept'  : 'application/json' ,
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + credential
            },
            body: JSON.stringify({
                postId:postId,
                userId:userId
            })
        })

        return await response.json()

    }catch(e){
        console.log(e)
    }
}


const postUnlike = async(postId,credential,userId) => {
    try{

        let response = await fetch('/api/post/unlike',{
            method: "PUT",
            headers : {
                'Accept'  : 'application/json' ,
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + credential
            },
            body: JSON.stringify({
                postId:postId,
                userId:userId
            })
        })

        return await response.json()

    }catch(e){
        console.log(e)
    }
}


const comments = async(postId,userId,credential,text)=>{
    try{
        let response = await fetch('/api/post/comment',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + credential
            },
            body : JSON.stringify({
                userId: userId,
                postId:postId,
                text:text,
            })
        })
        return await response.json()
    }catch(e){
        console.log(e)
    }
}

const removePost = async(id,jwt,signal) => {
    try{
        let response = await fetch('/api/post/remove/'+ id,{
            method: "DELETE",
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


export {creatPost,listNewFeed,postByUser,postLike,postUnlike,comments,removePost}
