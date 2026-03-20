import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv';
dotenv.config();

export const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message: 'Unauthorised - no token provided'})

            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(!decode) return res.status(401).json({message: 'Unauthorised - invalid token'})

            const user = await User.findById(decode.userId).select("-password")
            if(!user) return res.status(404).json({message: 'user not found'})

        req.user = user
        next()
    } catch (error) {
        console.log("error in protected route middleware",error)
        res.status(500).json({message:'internal server error'})
    }
}