import app from "./express";
import config from "../config/config";
import mongoose from "mongoose"
import Template from "../template"

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true , useFindAndModify:false})



app.listen(config.port,(err)=>{
  if(err){
      console.log(err)
  }
  console.info("server started on port $s.",config.port)
})