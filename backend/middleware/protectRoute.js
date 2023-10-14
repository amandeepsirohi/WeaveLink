import User from "../models/userModel.js";
import  jwt  from 'jsonwebtoken';


const protectRoute = async (req , res , next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({message:"Unauthorized User"});

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        req.user= user;
        next();
    }catch(error)
    {
        res.status(500).json({message:error.message});
        console.log("Unauthorized Action" , error.message);
    }
}

export default protectRoute;