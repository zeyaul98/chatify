import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";


export const getAllContacts = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in get all contacts", error)
        res.status(500).json({message:'interval server error'})
    }
};


export const getMessageByUserId = async(req, res) => {
    try {
        const myId =  req.user._id;
        const {id:userToChatId} = req.params; 

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log('error in get message controller',error);
        res.status(500).json('internal server error')
        
    }
}


export const sendMessage = async (req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        if(!text && !image){
            return res.status(400).json({message:'text or image are required'})
        }

        const receiverExists = await User.exists({_id:receiverId});
        if(!receiverExists){
            return res.status(400).json({message:'receiver does not exist'})
        }

        let imageUrl;

        // ✅ only upload if image exists
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // ✅ ALWAYS create message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // ✅ ALWAYS send response
        res.status(201).json(newMessage);

    } catch (error) {
        console.log('error in sendMessage controller',error);
        res.status(500).json('internal server error')
    }
}


export const getAllPartners = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;

        // find all the messages of the loggedIn user eithe it was sender and receiver
        const messages = await Message.find({
            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}]
        })

        const chatPatnerIds = [...new Set(messages.map((msg)=>
        msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        )
    )];

    const chatPartners = await User.find({_id:{$in:chatPatnerIds}}).select('-password');
    res.status(200).json(chatPartners);
    } catch (error) {
        console.log('error in get partner controller', error);
        res.status(500).json('internal server error')
    }
}