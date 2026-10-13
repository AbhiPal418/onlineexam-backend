import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWTForStudent = asyncHandler(async (req,res,next)=>{

    try {
        if(req.user.role === "teacher"){
            throw new ApiError(404,"Only for Student");
        }
        req.user = req.user
        next();
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid access token")
    }
})

const verifyJWTForTeacher = asyncHandler(async (req,res,next)=>{

    try {
        if(req.user.role === "student"){
            throw new ApiError(404,"Only for Teacher");
        }
        req.user = req.user
        next();
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid access token")
    }
})

const verifyJWT = asyncHandler(async (req,res,next)=>{

    try {
        // console.log(req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        // console.log(token)
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid access token")
        }
        req.user = user
        next();
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid access token")
    }
})

export{
    verifyJWTForStudent,
    verifyJWTForTeacher,
    verifyJWT
}