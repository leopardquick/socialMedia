import { Card, Typography , CardContent, Icon , CardActions ,Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '../theme'
import { TextField , Dialog,DialogActions ,DialogTitle ,DialogContent ,DialogContentText} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { signin } from './api-auth'
import { authenticate } from './auth-helper'


export default function Signin(){
    const classes = useStyles()
    
    const[values,setValues] = useState({
        password: '',
        email: '',
        redirectToReferrer: false,
        error : ''
    })

    const handleChange = name => event => {
        setValues(
            {...values,[name]:event.target.value}
        )
    }

    const clicksubmit = () => {
      const user = {
          email : values.email,
          password : values.password
      }
      signin(user).then((data)=>{
        if(data.error){
            setValues({
                ...values , error:data.error
            })
        }else{
           authenticate(data,()=>{
              setValues({
                  ...values,
                  error: '',
                  redirectToReferrer: true
              })
           })
        }
      })
    }

    if(values.redirectToReferrer){
        return <Redirect to='/'/>
    }

   return (
       <div>
           <Card className={classes.card}>
               <CardContent className={classes.content}>
                   <Typography className={classes.title} variant="h6">
                      Sign in
                   </Typography>
                   <TextField id="email" 
                   value={values.email} label="email"
                    className={classes.textField}
                    onChange={handleChange('email')}
                    margin="normal"
                   />
                   <br />
                   <TextField id="password" 
                   value={values.password} label="password"
                    className={classes.textField}
                    type='password'
                    onChange={handleChange('password')}
                    margin="normal"
                   />
                   <br />
                   {
                       values.error && (
                           <Typography component="p" color="error">
                               <Icon color="error" className={classes.error}>error</Icon>
                               {values.error}
                           </Typography>
                       )
                   }
               </CardContent>
               <CardActions>
                   <Button color="primary" variant="contained" className={classes.submit} onClick={clicksubmit}>
                       Signin
                   </Button>
               </CardActions>
           </Card>
       </div>
   )
}