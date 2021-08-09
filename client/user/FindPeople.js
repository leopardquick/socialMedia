import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/auth-helper'
import { follow, peoplefind } from './api-user'
import { makeStyles } from '@material-ui/styles'
import { values } from 'lodash'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ViewIcon from '@material-ui/icons/Visibility'
import {Link} from 'react-router-dom'
import { Snackbar } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing(1),
      margin: 0
    }),
    title: {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle,
      fontSize: '1em'
    },
    avatar: {
      marginRight: theme.spacing(1)
    },
    follow: {
      right: theme.spacing(2)
    },
    snack: {
      color: theme.palette.protectedTitle
    },
    viewButton: {
      verticalAlign: 'middle'
    }
  }))

export  default function FindPeople(){

    let classes = useStyles()
    const [value,setValue] = useState({users:[]})
    const [snack , setSnack] = useState({
      open : false,
      followMessage: ''
    })

    const clickFollow =(user,index)=>{
      const jwt = isAuthenticated()
      follow(jwt.user._id,jwt.token,user._id).then((data)=>{
        if(data && data.error){
          console.log(data.error)
        }else{
          let tofollow = value.users
          tofollow.splice(index,1)
          setValue({...values,users:tofollow})
          setSnack({...values , open:true ,followMessage: `Following ${user.name}!`})
        }
      })
    }

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal

        const jwt  = isAuthenticated()

        peoplefind(jwt.user._id,jwt.token,signal).then((data)=>{
            if(data && data.error){
                console.log(data.error)
            }else{
                setValue({...values,users:data})
            }
        })
        

    },[])

    const handleRequestclose = () => {
      setSnack({...values , open:false})
    }
    return (<div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Who to follow
          </Typography>
          <List>
            {value.users.map((item, i) => {
                return <span key={i}>
                  <ListItem>
                    <ListItemAvatar className={classes.avatar}>
                        <Avatar src={'/api/users/photo/'+item._id}/>
                    </ListItemAvatar>
                    <ListItemText primary={item.name}/>
                    <ListItemSecondaryAction className={classes.follow}>
                      <Link to={"/user/" + item._id}>
                        <IconButton variant="contained" color="secondary" className={classes.viewButton}>
                          <ViewIcon/>
                        </IconButton>
                      </Link>
                      <Button aria-label="Follow" onClick={()=>{
                        clickFollow(item,i)
                      }} variant="contained"  color="primary" >
                        Follow
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </span>
              })
            }
          </List>
        </Paper>
        <Snackbar 
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'right'
         }}
         open={snack.open}
         onClose={handleRequestclose}
         autoHideDuration={4000}
         message={<span className={classes.snack}>{snack.followMessage}</span>}
         />
      </div>)
}