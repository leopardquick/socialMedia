import mongoose, { Schema }  from "mongoose"
import crypto from 'crypto'


const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required: 'Name is required'
    },
    email : {
        type : String ,
        trim  : true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/,"please fill a valid email address"],
        required : 'Email is required'
    },

    about: {
        type: String,
        trim : true
    },
    photo: {
        data: Buffer,
        contentType : String

    },
    created: {
        type : Date,
        default : Date.now
    },
    
    following: [{type: Schema.Types.ObjectId, ref:'User'}],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    update: Date,
    hashed_password : {
        type: String,
        required : "Password is required"
    },
    salt: String

})


UserSchema.virtual("password")
         .set(function(password){
             this._password = password,
             this.salt = this.makeSalt()
             this.hashed_password = this.encryptPasword(password)
         })
         .get(function(){
             return this._password
         })

UserSchema.methods = {
    authenticate: function(plainText){
        return this.hashed_password === this.encryptPasword(plainText)
    },
    encryptPasword : function(password){
        if  (!password) return ''
        try {
            return crypto
                    .createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex')
        } catch(err){
            return ''
        }
    },
    makeSalt : function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password','password must be at least 6 character')
    }
    if(this.isNew  && !this._password){
        this.invalidate('password','Password is required')
    }
},null)
          



export default mongoose.model('User',UserSchema)