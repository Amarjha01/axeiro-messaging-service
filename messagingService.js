import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectKafka } from "./messaging-service/kafka.js";
import { startConsumer } from "./messaging-service/consumer.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const options = [
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    credentials: true,
    origin: options,
  })
);

// ✅ Start the server **after Kafka connects and consumer starts**
const startServer = async () => {
  try {
    console.log("🚀 Messaging Service starting...");

    await connectKafka(); 
    console.log("✅ Kafka connected successfully!");

    await startConsumer(); 
    console.log("📡 Consumer started and listening for messages...");

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`✅ Server is running on port ${process.env.SERVER_PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start Messaging Service:", err);
  }
};
startServer();
