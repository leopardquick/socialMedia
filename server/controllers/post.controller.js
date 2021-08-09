import formidable from 'formidable'
import errorHandler from '../helpers/dbErrorHandler'
import Post from '../models/post.model'
import fs from 'fs'

const listNewsFeed = async(req,res) =>{

    let following = req.profile.following
    following.push(req.profile._id)
    try{
     let posts = await Post.find({ postedBy : { $in : following}})
                        .populate('comments.postedBy' , '_id name')
                        .populate('postedBy' , '_id name')
                        .sort('-created')
    res.json(posts)
    }catch(e){
        return res.status(400).json({
            error : errorHandler.getErrorMessage(e)
        })
    }

}

const create = async(req,res,next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err,fields,files)=>{
        if(err){
           return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields)
        post.postedBy = req.profile
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.ContentType = files.photo.type
        }
        try{
            let result = await post.save()
            res.json(result)
        }catch(e){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(e)
            })
        }
    })
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
   }

const postById = async(req,res,next,id) =>{
    try{

        let post = await Post.findById(id)
        if(!post){
            return res.status(400).json({
                error: 'no post found'
            })
        }
        
        req.post = post
        next()
        
    }catch(e){
        res.status(400).json({
            error: errorHandler.getErrorMessage(e)
        })
    }
}

const isThePoster = (req,res,next,id) => {
  if(req.post.postedBy === req.auth._id){
      next()
  }else{
     return  res.status(400).json({
          error : "Your not authorized to delete post"
      })
  }
}

const remove = async(req,res)=>{
    try{
        let post  = req.post
        let deletedPost = await post.remove()
        res.json(deletedPost)
    }catch(e){
        res.status(400).json({
            error : errorhandler.getErrorMessage(e)
        })
    }
}

const postByUser = async(req,res) =>{
    try{
    let posts = await Post.find({postedBy:req.profile._id})
                .populate('postedBy','_id name')
                .sort('-created')
    res.json(posts)
    }catch(e){
        res.status(400).json({
            error: errorHandler.getErrorMessage(e)
        })
    }
}

const creatComments = async(req,res) => {

    try{
        let result = await Post.findByIdAndUpdate(req.body.postId, { $push : { comments : { text: req.body.text , postedBy: req.body.userId}}})
        res.json(result)
    }catch(e){
        res.status(400).json({
            error: errorHandler.getErrorMessage(e)
        })
    }

}


const likes = async(req,res)  => {
    try{
        let result = await Post.findByIdAndUpdate(req.body.postId,{$push: {likes:req.body.userId}})
        res.json(result)
    }catch(e){
        res.status(400).json({
            error : errorHandler.getErrorMessage(e)
        })
    }
}

const unlikes = async(req,res)  => {
    try{
       let result =   await Post.findByIdAndUpdate(req.body.postId,{$pull: {likes:req.body.userId}})
        res.json(result)
    }catch(e){
        res.status(400).json({
            error : errorHandler.getErrorMessage(e)
        })
    }
}
export default {listNewsFeed ,create , photo,postById,postByUser,likes,unlikes,creatComments,isThePoster,remove}
