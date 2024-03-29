import { Router } from "express";
import { addChat, deleteChatById, getAllChats, getChatById, newChat } from "../controllers/chat.js";
import { verifyTokenMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/new",verifyTokenMiddleware, newChat);
router.put("/update",verifyTokenMiddleware,addChat);

router.get('/chats',verifyTokenMiddleware, getAllChats);


router.get("/chatId",verifyTokenMiddleware, getChatById);
router.delete('/chatId', verifyTokenMiddleware,deleteChatById);




export default router;
