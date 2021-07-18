import User from '../models/user.model'
import errorhandler from '../helpers/dbErrorHandler'
import _ from 'lodash'

const create = async (req,res)=>{
    const user = new User(req.body)
    try {
       await user.save()
        return res.status(200).json({
            message: "successfully signed up"
        })
    }catch (err){
        return res.status(400).json({
            error: errorhandler.getErrorMessage(err)
        })
    }
}

const list = async(req,res) => {
    try{
       const users = await User.find().select('name email updated created')
       res.json(users)
    }catch(err){
        return res.status(400).json({
            error : errorhandler.getErrorMessage(err)
        })
    }
}

const userByID = async(req,res,next,id)=>{
    try{
        let user = await User.findById(id)
        if (!user) return res.status('400').json({
            error: "user not found"
        })
        req.profile = user
        next()
    }catch(err){
        return res.status('400').json({
            error: "could not retrieve data"
        })
    }
}

const read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async(req,res)=>{
   try {
       let user = req.profile
       user = _.extend(user,req.body)
       user.update = Date.now()
       await user.save()
       user.hashed_password = undefined
       user.salt = undefined
       res.json(user)
   }catch(e){
       return res.status(400).json({
           error: errorhandler.getErrorMessage(e)
       })
   }
}

const  remove = async(req,res)=>{
    try{
        let user  = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    }catch(e){
        res.status(400).json({
            error : errorhandler.getErrorMessage(e)
        })
    }
}

export default {create ,list ,userByID ,read,update,remove}

