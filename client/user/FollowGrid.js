import { Avatar, GridList, GridListTile, Typography } from '@material-ui/core'
import React from 'react'
import { ImageList } from '@material-ui/core'
import { ImageListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      background: theme.palette.background.paper,
    },
    bigAvatar: {
      width: 60,
      height: 60,
      margin: 'auto'
    },
    gridList: {
      width: 500,
      height: 220,
    },
    tileText: {
      textAlign: 'center',
      marginTop: 10
    }
  }))

  export default function FollowGrid(props){

    
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ImageList rowHeight={160} className={classes.gridList} cols={4}>
                {
                    props.people.map((person,i)=>{
                        return <ImageListItem key={i} style={{height :120 }}>
                            <Link to={'/user/'+person._id}>
                                <Avatar src={'/api/users/photo/'+person._id} className={classes.bigAvatar} />
                            </Link>
                            <Typography className={classes.tileText}>
                                {person.name}
                            </Typography>
                        </ImageListItem>
                    })
                }
            </ImageList>
        </div>
    )

  }