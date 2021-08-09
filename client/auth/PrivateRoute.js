import React ,{Component} from 'react'
import {Route ,Redirect} from 'react-router-dom'
import auth, { isAuthenticated } from './auth-helper'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={ props => (
    isAuthenticated() ? (
      <Component {...props} />
    ): (
      // <Redirect to={{
      //   pathname: '/'
      // }} />
      <Component {...props} />
    )
  )} />
)

export default PrivateRoute