import { Card, Typography , CardContent, Icon , CardActions ,Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '../theme'
import { create, update } from './api-user'
import { TextField } from '@material-ui/core'
import { Link , Redirect} from 'react-router-dom'
import  Fileupload from '@material-ui/icons/AddPhotoAlternate'
import { isAuthenticated } from '../auth/auth-helper'


export default function EditProfile({match}){
    const classes = useStyles()
    
    const[values,setValues] = useState({
        name: '',
        about: '',
        photo: '',
        password: '',
        email: '',
        error : '',
        userId: '',
        redirectToprofile : false
    })

    const handleChange = name => event => {
        const valu = name === 'photo' 
        ? event.target.files[0] : event.target.value
        setValues(
            {...values,[name]: valu}
        )
    }

    const clicksubmit = () => {
        let userData = new FormData()
        values.name && userData.append('name',values.name)
        values.email && userData.append('email',values.email)
        values.about && userData.append('about',values.about)
        values.password && userData.append('password',values.password)
        values.photo && userData.append('photo',values.photo)
        update(match.params.userId,isAuthenticated().token,userData).then((data)=>{
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
                   <input accept="image/*" type='file'
                       onChange={handleChange('photo')}
                       style={{display:'none'}}
                       id="icon-button-file"
                   />
                   <label htmlFor="icon-button-file">
                        <Button variant="contained" color="default" component="span">
                            Upload <Fileupload />
                        </Button>
                   </label>
                   <span className={classes.filename}>
                     {values.photo ? values.photo.name : ''}
                    </span>
                   <br />
                   <TextField id="name" 
                   value={values.name} label="name"
                    className={classes.textField}
                    onChange={handleChange('name')}
                    margin="normal"
                   />
                   <br />
                   <TextField
                       id="multiline-flexible"
                       label="about"
                       multiline
                       className={classes.textField}
                       rows="2"
                       value={values.about}
                       onChange={handleChange('about')}
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