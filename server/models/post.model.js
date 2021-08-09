import mongoose, { Schema } from "mongoose";


const PostSchema = new mongoose.Schema({

    text: {
        type: String,
        required: 'Text is required'
    },

    photo: {
        data: Buffer,
        ContentType: String
    },

    postedBy: { type: Schema.Types.ObjectId , ref: 'User'},

    created: { type: Date , default: Date.now},

    likes: [{ type: Schema.Types.ObjectId , ref: 'User'}],

    comments: [{
        text: String,
        created: { type: Date , default:Date.now},
        postedBy: { type: Schema.Types.ObjectId , ref: 'User'}
    }]


})


export default mongoose.model('Post',PostSchema)