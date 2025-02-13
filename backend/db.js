const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/messages", messageRoutes);


const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/contact").then(() => {
        console.log("Connected to MongoDB ✅");
    }).catch((err) => console.error("MongoDB connection error:", err));
app.listen(PORT,()=>{
    console.log("server connected on PORT", PORT);
})