import User from '../models/userModel.js';
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

const getUserProfile = async (req , res) => {

    const {username} = req.params;
    try{
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(400).json({message:"user not found"});

        res.status(200).json(user);
    }catch(error)
    {
        res.status(500).json({message : error.message});
        console.log({message:"Error in getting Profile"}, error.message);
    }
}

const signupUser = async(req , res) =>{
    try{
        const {name , password , email , username} = req.body;
        const user = await User.findOne({$or:[{email} ,{username}]});

        if(user){
            return res.status(400).json({message : "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            name ,
            email,
            username,
            password:hashedPassword,
        });

        await newUser.save();

        if(newUser)
        {   generateTokenAndSetCookie(newUser._id , res);
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email : newUser.email,
                username : newUser.username,
            });
        } else{
            res.status(400).json({message:"invalid user data"});
        }
        

    }catch(err)
    {
        res.status.json({message:err.message});
        console.log("Error in SignUp: " , err.message);
    }
};

const loginUser = async(req , res) =>{
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

        if(!user || !isPasswordCorrect) return res.status(400).json({message : "Invalid username or password "});

        generateTokenAndSetCookie(user._id , res);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        })

    }catch(error)
    {
        res.status(500).json({message:error.message});
        console.log("Error in logging in User" , error.message);
    }
} ;

const logoutUser = (req , res) => {
    try{
        res.cookie("jwt", "" , {maxAge:1});
        res.status(200).json({message:"User logged out sucessfully"});
    }catch(error)
    {
        res.status(500).json({message:error.message});
        console.log("Error in logging in User" , error.message);
    }
};

const followUnfollowUser = async (req , res) => {
    try{
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({message : "You can't follow or unfollow yourself" });

        if(!userToModify || !currentUser) return res.status(400).json({message:"USer not found"});

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing)
        {
            await User.findByIdAndUpdate(req.user._id , {$pull : {following:id}});
            await User.findByIdAndUpdate(id ,{$pull : {followers : req.user._id}});
            res.status(200).json({message:"User unfollowed Successfully"});
        }
        else{
            await User.findByIdAndUpdate(req.user._id , {$push : {following:id}});
            await User.findByIdAndUpdate(id ,{$push : {followers : req.user._id}});
            res.status(200).json({message:"User followed Successfully"});
        }

         
    }catch(error)
    {
        res.status(500).json({message:error.message});
        console.log("Error in follow/unfollow user" , error.message);
    }
};

const updateUser = async(req , res) => {
    const {name , email , username , password , profilePic , bio} = req.body;
    const userId = req.user._id;
    try{
       let user = await User.findById(userId);
        if(!user) res.status(400).json({message :"User Not Found"});

        if(req.params.id !== userId.toString()) return res.status(400).json({message : "can't update others profile"});

        if(password)
        {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , hash);
            user.password = hashedPassword;
        }
        
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();
        res.status(200).json({message:"User Updated Successfully!!" , user});

    }catch(error){
        res.status(500).json({message : error.message});
        console.log("Error in update user : " , err.message);
    }
}

export  {getUserProfile,signupUser , loginUser , logoutUser , followUnfollowUser , updateUser};