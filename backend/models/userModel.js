import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    required:true,
    minLength:6,
  },
  profilePic:{
    type:String,
    default:"",
  },
  followers:{
    type:[String],
    default:[],
  },
  following:{
    type:[String],
    default:[],
  },
  bio:{
    type:String,
    default:""
  }
}, {
    timestamps:true,
});

const User = mongoose.model("User" , userSchema);

export default User;