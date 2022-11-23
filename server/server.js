const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: `http://${process.env.IP_ADDRESS}:3000`,
  },
});

let users = [];
let messages = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    messages.push(data);
    socketIO.emit("messageResponse", messages);
    console.log(data);
  });

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
    socketIO.emit("messageResponse", messages);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  messages = [];
  res.json({
    message: "Hello World",
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
