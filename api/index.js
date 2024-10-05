import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("disconnected to mongoDB");
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

const port = 5000;
app.listen(port, () => {
  connect();
  console.log("====================================");
  console.log(`connected to ${port} backend nodemon test`);
  console.log("====================================");
});
