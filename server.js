const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8000"],
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on(process.env.WEBSOCKET_KEY, (id, event, msg) => {
    console.log(id, event, msg);
    socket.broadcast.emit(id, event, msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
