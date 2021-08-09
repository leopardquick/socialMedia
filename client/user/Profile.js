import React, { useEffect, useState } from 'react'
import { useStyles } from '../theme'
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import { Delete, Edit, Person } from '@material-ui/icons'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/auth-helper'
import { read } from './api-user'
import { Button } from '@material-ui/core'
import DeleteUser from './DeleteUser'
import { values } from 'lodash'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import { postByUser } from '../post/api-post'



export function Profile({match}){
    const classes = useStyles()


   
   

    const [value , setValues]  = useState({
        user : {following:[],followers:[]}
    })
    const [redirect , setRedirect] = useState(false)
    const [following , setfollowing] = useState(false)
    const [post,setPost] = useState([])

   
    const checkFollow = (user) => {
        const match = user.followers.some((follower)=> {
        return follower._id == isAuthenticated().user._id
        })
        return match
       }



    const clickFollowButton = (callApi) => {
        const jwt = isAuthenticated()
        callApi(jwt.user._id,jwt.token,value.user._id).then((data)=>{
            if(data && data.error){
                console.log(data.error)
            }else{
                setfollowing((value)=>{
                    return !value
                })
                let abortcontroller = new AbortController()
                const signal = abortcontroller.signal
                const jwt = isAuthenticated()
                read(match.params.userId,jwt.token,signal).then((data)=>{
                    if(data && data.error){
                        setRedirect(true)
                    }else{
                        setValues({...values,user:data})
                        setfollowing(checkFollow(data))
                    }
                })
            }
        })
    }
   

    const photoUrl =  value.user._id ? `/api/users/photo/${value.user._id}`: '/api/photo/defaultphoto'

    useEffect(()=>{
        let abortcontroller = new AbortController()
        const signal = abortcontroller.signal
        const jwt = isAuthenticated()

        read(match.params.userId,jwt.token,signal).then((data)=>{
            if(data && data.error){
                setRedirect(true)
            }else{
                setValues({...values,user:data})
                setfollowing(checkFollow(data))
                loadpost(data._id)
            }
        })
        
    },[match.params.userId])

    if(redirect){
        return   <Redirect to='/signin' />
      }
      const loadpost = (user) =>{
        postByUser(user,isAuthenticated().token).then((data)=>{
          if(data && data.erro){
            connole.log(data.error)
          }else{
           setPost(data)
          }
        })
      }
    return (
    <Paper className={classes.card} elevation={4}>
        <Typography variant="h6" className={classes.title}>
             Profile
        </Typography>
        <List dense>
        <ListItem>
            <ListItemAvatar>
            <Avatar src={photoUrl} />
            </ListItemAvatar>
            <ListItemText primary={value.user.name} secondary={value.user.email}/> 
            </ListItem>
            <ListItem >
               <ListItemText primary={value.user.about}/>
            </ListItem>
            {
                isAuthenticated() && isAuthenticated().user._id==value.user._id ?
                (
                    <ListItemSecondaryAction>
                        <Link to={"/profile/edit/" + value.user._id}>
                        <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                        </IconButton>
                        </Link>
                        <DeleteUser userId={value.user._id} />
                    </ListItemSecondaryAction>
                )
                :
                (
                    <ListItemSecondaryAction>
                       <FollowProfileButton following={following} onButtonClick={clickFollowButton}></FollowProfileButton>
                    </ListItemSecondaryAction>
                )
            }
           
            <Divider/>
        <ListItem>
        <ListItemText primary={"Joined: " + (
             new Date(value.user.created)).toDateString()}/>
        </ListItem>
        </List>
        <ProfileTabs user={value.user} post={post} />
       
       
    </Paper>

    )
}