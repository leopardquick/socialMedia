import React from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Home } from '@material-ui/icons'
import { clearJWT, isAuthenticated } from '../auth/auth-helper'

const isActive = (history,path)=>{
    if(history.location.pathname == path){
        return {color : '#ff4081'}
    }else{
        return {color : '#ffffff'}
    }
}
const Menu = withRouter(({history})=>{
   return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h6" color='inherit'>
                    Mern Skeleton
                </Typography>
            <Link to='/'>
                <IconButton style={isActive(history,'/')}>
                  <Home/>
                </IconButton>
            </Link>
            <Link to='/users'>
                <Button style={isActive(history,'/users')} >Users</Button>
            </Link>
            {
                !isAuthenticated() && (
                    <span>
                    <Link to='/signup'>
                         <Button style={isActive(history,'/signup')} >Sign Up</Button>
                     </Link>
                     <Link to='/signin'>
                         <Button style={isActive(history,'/signin')} >Sign In</Button>
                     </Link>
                    </span>
                )
            }
            {
                isAuthenticated() && (
                    <span>
                    <Link to={"/user/"+isAuthenticated().user._id}>
                         <Button style={isActive(history,'/user'+ isAuthenticated().user._id)} >My Profile</Button>
                     </Link>
                         <Button color='inherit' onClick={() =>{
                             clearJWT(()=>{
                                 history.push('/')
                             })
                         } } >Sign Out</Button>
                    </span>
                )
            }
            </Toolbar>
        </AppBar>
    )
})


export default Menu