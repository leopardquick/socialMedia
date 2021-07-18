import { Typography } from '@material-ui/core'
import { Card, makeStyles } from '@material-ui/core'
import { maxWidth } from '@material-ui/system'
import React from 'react'
import theme from '../theme'
import { CardMedia } from '@material-ui/core'
import unicornImg from '../assets/images/unicornbike.jpg'
import { CardContent } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
    },
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
    },
    media: {
    minHeight: 400
    }
   }))

export default function Home(){
    const classes = useStyles()
    return  (
        <Card className={classes.card}>
            <Typography className={classes.title} variant="h6">
                Home Page
            </Typography>
            <CardContent>
               <CardMedia className={classes.media} image={unicornImg}>

               </CardMedia>
                <Typography variant="body2" component='p'>
                    welcom to mern skeleton page
                </Typography>
            </CardContent>

        </Card>
    )
}