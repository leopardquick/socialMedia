import { Dialog, DialogContentText, DialogTitle, IconButton , DialogContent, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import  React, { useState } from 'react'
import { DialogActions } from '@material-ui/core'
import { remove } from './api-user'
import { clearJWT, isAuthenticated } from '../auth/auth-helper'
import { Redirect } from 'react-router'

export default function DeleteUser(props){
  
    const [open , setOpen] = useState(false)
    const [redirect , setRedirect] = useState(false)
    
    const clicked = () => {
       setOpen(true)
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
    const deleteAccount = () => {
        remove(props.userId,isAuthenticated().token).then((data)=>{
            if(data && data.error){
                console.log(data.error)
            }else{
                clearJWT(()=>{
                    console.log("deleated")
                })
                setRedirect(true)
            }
        })
    }
    if(redirect){
        return <Redirect to='/' />
    }
    return (
        <span>
            <IconButton onClick={clicked} color="secondary">
               <Delete />
            </IconButton>
            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>
                    {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        confirm to delete the account
                    </DialogContentText>
                    <DialogActions>
                        <Button color="primary" onClick={handleRequestClose}>Cancel</Button>
                        <Button color="seconadry" onClick={deleteAccount}>confirm</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </span>
    )
}