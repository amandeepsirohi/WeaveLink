
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import {v2 as cloudinary} from "cloudinary";

const createPost = async (req , res) => {
    try {

        const {postedBy , text } = req.body;
        let {img} = req.body;

        if(!postedBy || !text)
        {
            return res.status(400).json({error :"username and text is required"});
        }

        const user = await User.findById(postedBy);
        if(!user) 
        {
            res.status(400).json({error : "User not found"});
        }
        
        if(user._id.toString() !== req.user._id.toString())
        {
            return res.status(401).json({error : "Unauthorized Action"});
        }

        const maxLen = 400;
        if(text.length > maxLen) {
            return res.status(400).json({error: "Text length exceeded 400"});
        }

        if(img){
            const uploadResponse= await cloudinary.uploader.upload(img);
            img = uploadResponse.secure_url;
        }

        const newPost = new Post({postedBy , text , img});

        await newPost.save();

        res.status(200).json({message : "Post Created Congrats " , newPost});

    } catch (error) {
        res.status(500).json({error : error.message});
        console.log(error);
    }
};

const getPost = async (req , res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post)
        {
            res.status(404).json({error : "Post not found"});
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({error : "Post not found"});
    }
};

const deletePost = async(req , res) =>{
    try {

        const post = await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).json({error :"Post not exist"});
        }

        if(post.postedBy.toString() !== req.user._id.toString())
        {
            return res.status(401).json({error : "Unauthorized Action"});
        }

        if(post.img)
        {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({message:"Post deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

const likeUnlikePost = async (req , res) => {
    try {
        const {id : postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post)
        {
            return res.status(404).json({error :"Post doesn't exist"});

        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost)
        {
            await Post.updateOne({_id:postId}, {$pull : {likes:userId}});
            res.status(200).json({message : "Unliked Successfully"});
        }
        else{
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message : "liked Successfully"});
        }

    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

const replyToPost = async (req, res) => {
	try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const reply = { userId, text, username , userProfilePic };

		post.replies.push(reply);
		await post.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFeedPosts = async (req , res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!user)
        {
            res.status(404).json({error:"User Not Found"});
        }

        const following = user.following;

        const feedPosts = await Post.find({postedBy : {$in : following}}).sort({createdAt: -1});

        res.status(200).json(feedPosts);

    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getUserPosts = async (req , res) => {
    const {username} = req.params;
    try {
        const user =await User.findOne({username});
        if(!username)
        {
            return res.status(404).json({error:"User Not Found"});
        }
        
        const posts = await Post.find({postedBy :user._id}).sort({createdAt:-1});

        res.status(200).json(posts);


    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export  {createPost , getPost , deletePost , likeUnlikePost , replyToPost ,getFeedPosts,getUserPosts};