import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography  } from '@material-ui/core'
import { Card ,Divider } from '@material-ui/core'
import { isAuthenticated } from '../auth/auth-helper'
import PostList from './PostList'
import NewPost from './NewPost'
import { listNewFeed } from './api-post'

const useStyles = makeStyles(theme => ({
    card: {
      margin: 'auto',
      paddingTop: 0,
      paddingBottom: theme.spacing(3)
    },
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle,
      fontSize: '1em'
    },
    media: {
      minHeight: 330
    }
  }))

  export default function NewsFeed(){

    const classes = useStyles()

    const [post,setPost] = useState([])
    
    const jwt = isAuthenticated()
    useEffect(()=>{

      const abortcontroller = new AbortController()
      const signal = abortcontroller.signal
      listNewFeed(jwt.user._id,jwt.token,signal).then((data)=>{
        if(data && data.error){
          console.log(data.error)
        }else{
          setPost(data)
        }
      })
    },[])

     const addPost = (posts) => {
      const updatedpost = [...post]
      updatedpost.unshift(posts)
      setPost(updatedpost)
     }
     const removePost = (item) => {
       let index = findindex(item)
       let updatedPost = [...post]
       updatedPost.splice(index,1)
       setPost(updatedPost)
     }
     const findindex = item =>{
       for (let i in post){
         if(post[i]._id == item._id){
           return i
         }
       }
     }
    return (
        <Card className={classes.card}>
          <Typography type="title" className={classes.title}>
            Newsfeed
          </Typography>
          <Divider/>
          <NewPost addUpdate={addPost} />
          <Divider/>
          <PostList posts={post} removeUpdate={removePost} />
        </Card>
      )
  }