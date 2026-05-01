import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { SocketAuthMiddleware } from '../middleware/socket.auth.middleware.js';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});


io.use(SocketAuthMiddleware);

//we use this function to check if the user is online or not
export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}



//this is for storing the online user
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("a user connected", socket.user.fullName);

    const userId = socket.user._id;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
    console.log("A User Disconnected", socket.user.fullName);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
});
});

export {io, server, app}
