import React, { useEffect, useState } from 'react'
import { useStyles } from '../theme'
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import { Delete, Edit, Person } from '@material-ui/icons'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/auth-helper'
import { read } from './api-user'
import DeleteUser from './DeleteUser'


export function Profile({match}){
    const classes = useStyles()
   

    const [user , setUsers]  = useState({})
    const [redirect , setRedirect] = useState(false)

   

    useEffect(()=>{
        let abortcontroller = new AbortController()
        const signal = abortcontroller.signal
        const jwt = isAuthenticated()

        read(match.params.userId,jwt.token,signal).then((data)=>{
            if(data && data.error){
                setRedirect(true)
            }else{
                setUsers(data)
            }
        })
        
    },[match.params.userId])

    if(redirect){
        return   <Redirect to='/signin' />
      }
    return (
    <Paper className={classes.card} elevation={4}>
        <Typography variant="h6" className={classes.title}>
             Profile
        </Typography>
        <List dense>
        <ListItem>
            <ListItemAvatar>
            <Avatar>
            <Person/>
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email}/> 
            </ListItem>
            {
                isAuthenticated() && isAuthenticated().user._id==user._id &&
                (
                    <ListItemSecondaryAction>
                        <Link to={"/user/edit/" + user._id}>
                        <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                        </IconButton>
                        </Link>
                        <DeleteUser userId={user._id} />
                    </ListItemSecondaryAction>
                )
            }
           
            <Divider/>
        <ListItem>
        <ListItemText primary={"Joined: " + (
             new Date(user.created)).toDateString()}/>
        </ListItem>
        </List>
    </Paper>

    )
}