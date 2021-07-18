
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from './../../config/config'
import expressJwt from 'express-jwt'

let signin = async(req,res)=>{
    try{
        let user = await User.findOne({"email" : req.body.email})
        if(!user){
            return res.status('401').json({
                error: "user not found"
            })
        } 
        if(!user.authenticate(req.body.password)){
            return res.status('401').send({
                error: "email and password not match"
            })
        }
        
        const token = jwt.sign({_id : user._id},config.jwtSecret)
        res.cookie('t',token,{expire: new Date() + 9999})
        
        return res.json({
            token,
            user: {
                _id : user._id,
                name : user.name,
                email : user.email
            }
        })
    }catch(e){
        return res.status('401').json({
            error : "could not sign in"
        })
    }

}

let signout = (req,res) => {
   res.clearCookie('t')
   return res.status('200').json({
       message: "signed out"
   })
}

const requireSignin = expressJwt({
    secret : config.jwtSecret,
    userProperty : 'auth',
    algorithms: ['sha1', 'RS256', 'HS256'],
})


const hasAuthorization = (req,res,next) => {
   const authorized = req.profile && req.auth &&  req.profile._id == req.auth._id
   if(!(authorized)){
       return res.status('403').json({
           error: "user is not authorized",

       })
   }
   next()
}

export default {signin,signout,requireSignin,hasAuthorization}