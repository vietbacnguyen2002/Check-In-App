import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  
  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { app, server, io };
