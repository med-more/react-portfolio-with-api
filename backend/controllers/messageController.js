import Message from "../Models/Message";


//save message
export const sendMessage = async(req, res) =>{
    try {
        const {name, email, countryCode, phone, message} = req.body;
        const newMessage = new Message({name, email, countryCode, phone, message});
        await newMessage.save();
        res.status(201).json({success: true, message: "Message sent successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: "server error", error});
    }
};

//get messages
export const getMessages = async(req, res) =>{
    try {
        const messages = await Message.find().sort({createdAt: -1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({success: false, message: "server error", error});
    }
};

//delete Message
export const deleteMessage = async(req, res) =>{
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({success: false, message: "server error", error});
    }
};