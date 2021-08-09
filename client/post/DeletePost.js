import { Dialog, DialogContentText, DialogTitle, IconButton , DialogContent, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import  React, { useState } from 'react'
import { DialogActions } from '@material-ui/core'
import { Redirect } from 'react-router'
import { isAuthenticated } from '../auth/auth-helper'
import { removePost } from './api-post'

export default function DeletePost(props){
  
    const [open , setOpen] = useState(false)
 
    const clicked = () => {
       setOpen(true)
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
    const deleteAccount = () => {
        const jwt = isAuthenticated()
        const id = props.id
        
        const abort = new AbortController()
        const signal = abort.signal
        removePost(id,jwt.token,signal).then((data)=>{
            if(data && data.error){
                console.log(data.error)
            }else{
                props.removeUpdate(data)
                setOpen(false)
            }
        })
        

    }
    return (
        <span>
            <IconButton onClick={clicked} >
               <Delete />
            </IconButton>
            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>
                    {"Delete Post"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        confirm to delete post
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