import Conversations from "../model/convirsations.js"
import Message from "../model/message.js"
import { getReceiverSocketId, io } from "../socket/Socket.js";

export const sendmessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        // const senderobjectId = new mongoose.Types.ObjectId(senderId)
        // const reciverobjectId = new mongoose.Types.ObjectId(reciverId)

        let conversation = await Conversations.findOne({
            participants: { $all: [senderId, reciverId] },
        });

        if (!conversation) {
            conversation = await Conversations.create({
                participants: [senderId, reciverId],
            });
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(reciverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in sendmessage ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMessage = async (req, res) => {
    try {

        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversations = await Conversations.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if (!conversations) return res.status(500).json([])

        const message = conversations.messages

        res.status(200).json(message)

    } catch (error) {
        console.log("Error in sendmessage ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }

}
