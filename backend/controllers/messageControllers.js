const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel.js");
const User = require("../models/userModel");
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log('invalid data passed into request');
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);
        message = await message.populate('sender', 'name pic')
        message = await message.populate('chat')
        message = await User.populate(message, { path: 'chat.users', select: 'name pic email' });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);

    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error('Error occured while saving message');
    }

});

const allMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.body;

    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name pic').populate('chat');

        res.json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        throw new Error('Error occured while fetching messages');
    }
});


module.exports = { sendMessage, allMessages };