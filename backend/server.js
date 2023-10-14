import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import bcrypt from "bcrypt";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

//all middlewares
app.use(express.json()); //parse json data => req.body
app.use(express.urlencoded({extended:true})); // parse form data => req.body
app.use(cookieParser());

//all routes
app.use("/api/users" , userRoutes);
app.use("/api/posts", postRoutes);


app.listen(PORT , () => console.log("Server Running successfully at port 5000"));