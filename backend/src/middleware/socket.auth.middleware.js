import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config();

export const SocketAuthMiddleware = async (socket, next) => {
    try {
        // extract token from http-only request
        const token = socket.handshake.headers.cookie
        ?.split(";")
        .find((row)=> row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            console.log("socket connection rejected: no token provided")
            return next(new Error("Unauthorised - No token Provided"))
        }

        // verity the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode){
            console.log("socket connection rejected : Invalid Token")
            return next(new Error("Unauthorised - Invalid token"))
        }

        //find the user from the database
        const user = await User.findById(decode.userId).select("-password");
        if (!user){
            console.log("socket connection rejected : User not found")
            return next(new Error("Unauthorised - User not found"))
        }

        //attach the user to the socket object for future use
        socket.user = user;
        socket.userId = user._id.toString();
        console.log(`socket connection accepted for user ${user.username} with id ${user._id}`)
        next();
    } catch (error) {
        console.log("socket connection rejected : ", error.message)
        return next(new Error("Unauthorised - " + error.message))
    }
}
