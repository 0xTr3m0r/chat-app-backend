import express from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloufdinary from "../lib/cloudnary.js";

export const getUserFromSideBar = async (req , res)=>{
    try {
        const LoggedInUserId = req.user._id;
        const filtredUsers = await User.find({
            _id: {$ne:LoggedInUserId},
            isBanned: false,
            isOnline: true
        }).select("-password");
        res.status(200).json(filtredUsers);
    } catch (error) {
        console.log("Error in getUsersFromSideBar : ",error.message);
        res.status(500).json({error: "Internal server error "});
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:receiverId},
                {senderId:receiverId,receiverId:senderId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages : ",error.message);
        res.status(500).json({error: "Internal server error "});
    }
}

export const sendMessage = async (req,res) =>{
    try {
        const {text,image} = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;
        let ImageUrl;
        if (image){
            const uploadResponse = await cloufdinary.uploader.upload(image);
            ImageUrl = uploadResponse.secure_url;

        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:ImageUrl
        })
        await newMessage.save();

        //to complete realtime funtionality : socket.io
        res.status(201).json({newMessage})
    } catch (error) {
        console.log("Error in sendMessage : ",error.message);
        res.status(500).json({error: "Internal server error "});
    }
}