import cors from "cors";
import cookieParser from 'cookie-parser';

import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import NodeCache from "node-cache";

import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

// Router
import AuditorRouter from "./routes/auditor.js";
import chatRouter from "./routes/chat.js";
import supplierRouter from "./routes/supplier.js";
import userRouter from "./routes/user.js";








dotenv.config()

const app = express();

// Environment
const port = Number(process.env.port) || Number(3000);
const host = process.env.host || "127.0.0.1";
const MongoDB_URL=process.env.MongoDB_URL

app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: true, credentials: true }))





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