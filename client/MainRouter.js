
import React from 'react'
import {Route , Switch} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import Home from './core/Home'
import Menu from './core/Menu'
import EditProfile from './user/EditProfile'
import { Profile } from './user/Profile'
import Signup from './user/Signup'
import Users from './user/Users'

const MainRouter = () =>{
    return (
        <div>

            <Menu />
            <Switch>
                <Route exact path='/' component={Home}  />
                <Route exact path='/users' component={Users} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <PrivateRoute path="/profile/edit/:userId" component={EditProfile} />
                <Route exact path='/user/:userId' component={Profile} />
            </Switch>
        </div>
    )
}


export default MainRouter