import path from "path"
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import handledbconnections from "./DBconnections/dbconnection.js";
import { app, server } from "./socket/Socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: "https://deploy-chatapp.onrender.com", credentials: true }))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

app.use(express.static(path.join(__dirname, "/Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
    handledbconnections();
    console.log(`server is running at ${PORT}`)
})

