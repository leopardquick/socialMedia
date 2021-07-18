import { Card, Typography , CardContent, Icon , CardActions ,Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '../theme'
import { create } from './api-user'
import { TextField , Dialog,DialogActions ,DialogTitle ,DialogContent ,DialogContentText} from '@material-ui/core'
import { Link } from 'react-router-dom'


export default function Signup(){
    const classes = useStyles()
    
    const[values,setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error : ''
    })

    const handleChange = name => event => {
        setValues(
            {...values,[name]:event.target.value}
        )
    }

    const clicksubmit = () => {
        const user = {
            name : values.name || undefined,
            email : values.email || undefined,
            password : values.password || undefined
        }
        create(user).then((data)=>{
            if(data.error){
                setValues({...values,error: data.error})
            }else {
                setValues({...values,error: '',open:true})
            }
        })
    }

   return (
       <div>
           <Card className={classes.card}>
               <CardContent className={classes.content}>
                   <Typography className={classes.title} variant="h6">
                       Sign Up
                   </Typography>
                   <TextField id="name" 
                   value={values.name} label="name"
                    className={classes.textField}
                    onChange={handleChange('name')}
                    margin="normal"
                   />
                   <br />
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
                       Submit
                   </Button>
               </CardActions>
           </Card>

           <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Link to="/signin">
                    <Button color="primary" autoFocus="autoFocus" 
                    variant="contained">
                    Sign In
                    </Button>
                </Link>
                </DialogActions>
            </Dialog>


       </div>
   )
}