import express from "express";
import NodeCache from "node-cache";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"

import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

// Router
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import supplierRouter from "./routes/supplier.js"
import AuditorRouter from "./routes/auditor.js"








dotenv.config()

const app = express();

// Environment
const port = Number(process.env.port) || Number(3000);
const host = process.env.host || "127.0.0.1";
const MongoDB_URL=process.env.MongoDB_URL

app.use(express.json());
app.use(morgan("dev"))
app.use(cors())



// Use Router for API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/supplier",supplierRouter); 
app.use("/api/v1/auditor",AuditorRouter); 


export const myCache=new NodeCache()

app.use("/uploads",express.static("uploads"));

app.use(errorMiddleware)
app.listen(port, host, async () => {
  if (!MongoDB_URL) {
    throw new Error("MongoDB URL is not provided in the environment variables. ");
  }
  await connectDB(MongoDB_URL);
  console.log(`Server is running on http://${host}:${port}`);
});