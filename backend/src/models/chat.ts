import mongoose, { Schema, Document } from "mongoose";
import { ChatType } from "../types/model.js";

// Define a schema for chat
const ChatSchema = new Schema<ChatType>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  data: [
    {
      _id: false,
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      chats: [
        {
          _id: false,
          role: {
            type: String,
            required: true,
          },
          parts: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

export const Chat = mongoose.model<ChatType>("Chat", ChatSchema);
