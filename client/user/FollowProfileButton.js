import { Button } from '@material-ui/core'
import React from 'react'
import { follow, unfollow } from './api-user'
import PropTypes from 'prop-types'

export default function FollowProfileButton(props){
    const followClick = () => {
       props.onButtonClick(follow)
    }

    const unfollowClick = () => {
        props.onButtonClick(unfollow)
    }

    return (
        <div>
            {
                props.following
                 
                 ? (<Button onClick={unfollowClick} variant='contained' color='secondary'>Unfollow</Button>)
                 :
                 (<Button onClick={followClick} variant='contained' color='primary'>follow</Button>)
            }
        </div>
    )

    FollowProfileButton.propTypes = {
        following : PropTypes.bool.isRequired,
        onButtonClick : PropTypes.func.isRequired
    }

}