
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

const createPost = async (req , res) => {
    try {

        const {postedBy , text , img} = req.body;

        if(!postedBy || !text)
        {
            return res.status(400).json({message :"username and text is required"});
        }

        const user = await User.findById(postedBy);
        if(!user) 
        {
            res.status(400).json({message : "User not found"});
        }
        
        if(user._id.toString() !== req.user._id.toString())
        {
            return res.status(401).json({message : "Unauthorized Action"});
        }

        const maxLen = 400;
        if(text.length > maxLen) {
            return res.status(400).json({message: "Text length exceeded 400"});
        }

        const newPost = new Post({postedBy , text , img});

        await newPost.save();

        res.status(200).json({message : "Post Created Congrats " , newPost});

    } catch (error) {
        res.status(500).json({message : error.message});
        console.log(error);
    }
};

const getPost = async (req , res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post)
        {
            res.status(404).json({message : "Post not found"});
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message : "Post not found"});
    }
};

const deletePost = async(req , res) =>{
    try {

        const post = await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).json({message :"Post not exist"});
        }

        if(post.postedBy.toString() !== req.user._id.toString())
        {
            return res.status(401).json({message : "Unauthorized Action"});
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({message:"Post deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

const likeUnlikePost = async (req , res) => {
    try {
        const {id : postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post)
        {
            return res.status(404).json({message :"Post doesn't exist"});

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
        res.status(500).json({message : error.message});
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

		const reply = { userId, text, userProfilePic, username };

		post.replies.push(reply);
		await post.save();

		res.status(200).json({message:"Reply added successfully !" , post});
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
            res.status(404).json({message:"User Not Found"});
        }

        const following = user.following;

        const feedPosts = await Post.find({postedBy : {$in : following}}).sort({createdAt: -1});

        res.status(200).json(feedPosts);

    } catch (error) {
        res.status(500).json(error.message);
    }
}

export  {createPost , getPost , deletePost , likeUnlikePost , replyToPost ,getFeedPosts};