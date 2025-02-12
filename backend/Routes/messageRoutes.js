import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/messages", sendMessage);
router.get("/messages", getMessages);
router.delete("/messages/:id", deleteMessage);

export default router;