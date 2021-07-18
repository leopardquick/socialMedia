import React from 'react'
import { Paper ,List ,ListItem, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ListItemAvatar , Avatar , ListItemText } from '@material-ui/core'
import { ListItemSecondaryAction } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { ArrowForward, Person } from '@material-ui/icons'
import { useEffect } from 'react'
import { useState } from 'react'
import { list } from './api-user'
import { useStyles , theme } from '../theme'
import { Typography } from '@material-ui/core'



export default function Users(){
    const [users,setUsers] = useState([])
    useEffect(()=>{
        const abortcontroller = new AbortController()
        const signal = abortcontroller.signal
        list(signal).then((data)=>{
           if(data.error && data){
               console.log(data.error)
           }else{
               setUsers(data)
           }
        })
      return function cleanup(){
         abortcontroller.abort()
      }
    },[])
   
    const classes = useStyles(theme)
    return (
        <Paper className={classes.card} elevation={4}>
            <Typography variant='h6' className={classes.title}>All Users</Typography>
            <List dense>{
                users.map((item,i)=>{
                    return <Link to={"/user/"+item._id} key={i}>
                        <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ArrowForward />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })
            }</List>
        </Paper>
    )
}