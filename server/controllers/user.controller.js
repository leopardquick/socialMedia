import User from '../models/user.model'
import errorhandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from './../../client/assets/images/profile-pic.png'
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
       const users = await User.find().select('name email about updated following followers created')
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
        .populate('followers','_id name')
        .populate('following', '_id name')
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
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error : "photo could not be uploaded",
                er : err
            })
        }
        let user = req.profile
        user = _.extend(user,fields)
        user.update = Date.now()
        if(files.photo){
            console.log(files.photo.path)
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType  = files.photo.type
        }
        try {
            await user.save()
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        }catch(e){
            return res.status(400).json({
                error: errorhandler.getErrorMessage(e)
            })
        }

    })
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


const photo = (req,res,next)=>{
    if(req.profile.photo.data){
        res.set("Content-Type",req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}

const defaultphoto = (req,res,next)=> {
    return res.sendFile(process.cwd()+profileImage)
}

const addFollowing = async (req,res,next) =>{
      try{
        let response = await User.findByIdAndUpdate(req.body.userId, 
            {$push: {following:req.body.followId}}) 
        next()
      }catch(error){
          return res.status(400).json({
              error: errorhandler.getErrorMessage(error)
          })
      }
}

const addFollower = async(req,res) => {
    try{
        let result = await User.findByIdAndUpdate(req.body.followId, {$push: {followers:req.body.userId}})
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
        
    }catch(e){
        return res.status(400).json({
            error: errorhandler.getErrorMessage
        })
    }
}


const removeFollowing = async (req,res,next) =>{
      try{
        let response = await User.findByIdAndUpdate(req.body.userId, 
            {$pull: {following:req.body.followId}}) 
        next()
      }catch(error){
          return res.status(400).json({
              error: errorhandler.getErrorMessage(error)
          })
      }
}

const removeFollower = async(req,res) => {
    try{
        let result = await User.findByIdAndUpdate(req.body.followId, {$pull: {followers:req.body.userId}})
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
        
    }catch(e){
        return res.status(400).json({
            error: errorhandler.getErrorMessage
        })
    }
}

const findPeople = async(req,res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try{

    let users = await User.find({_id: { $nin : following}})
                        .select('name')
    res.json(users)
  }catch(e){
      return res.status(400).json({
          error: errorhandler.getErrorMessage(e)
      })
  }
}






export default {create ,list ,userByID ,read,update,remove,photo,defaultphoto,addFollowing,addFollower,removeFollowing,removeFollower,findPeople}

