import mongoose from "mongoose";
import {Schema} from "mongoose";

const postSchema = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true"
  },
  text: {
    type: String,
    maxLength: 400
  },
  img: {
    type: String
  },
  likes: {
    type:[mongoose.Schema.Types.ObjectId],
    ref:"User",
    default:[],
  },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      text: {
        type: String,
        required: true
      },
      userProfilePic: {
        type: String
      },
      username :{type: String}
    }
  ]
},{
    timestamps:true,
});

const Post = mongoose.model("Post" , postSchema);

export default Post;