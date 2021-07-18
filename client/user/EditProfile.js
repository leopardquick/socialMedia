import { Card, Typography , CardContent, Icon , CardActions ,Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '../theme'
import { create, update } from './api-user'
import { TextField } from '@material-ui/core'
import { Link , Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth/auth-helper'


export default function EditProfile({match}){
    const classes = useStyles()
    
    const[values,setValues] = useState({
        name: '',
        password: '',
        email: '',
        error : '',
        userId: '',
        redirectToprofile : false
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
        update(match.params.userId,isAuthenticated().token,user).then((data)=>{
            if(data && data.error){
                setValues({...values , error: data.error})
                console.log(data)
            }else{
                setValues({...values , userId:data._id , redirectToprofile:true})
            }
        })
    }

    if(values.redirectToprofile){
        return (<Redirect to={'/user/' + values.userId} />)
    }

   return (
       <div>
           <Card className={classes.card}>
               <CardContent className={classes.content}>
                   <Typography className={classes.title} variant="h6">
                       Edit profile
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
       </div>
   )
}