const express = require("express");
const app = express();
const PORT = 4000; // use port 4000
require("dotenv").config();

const http = require("http").Server(app);
const cors = require("cors");
const { disconnect } = require("process");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: [
      `http://${process.env.REACT_APP_IP_ADDRESS}:3000`,
      `http://chat.${process.env.REACT_APP_IP_ADDRESS}`,
    ], // connect to client server and only receive from the given ip address and port
  },
});

let users = []; // array of users
let messages = []; // array of all the messages sent from clients

socketIO.on("connection", (socket) => {
  // open socket for connection
  console.log(`⚡: ${socket.id} user just connected!`); // log clients that are connected

  // receive message and add it to messages array
  socket.on("message", (data) => {
    messages.push(data);
    socketIO.emit("messageResponse", messages);
    console.log(data);
  });

  // receive new user and add it to users array
  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
    socketIO.emit("messageResponse", messages);
  });

  // event listener when a user is disconnected
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

// testing api
app.get("/api", (req, res) => {
  messages = [];
  res.json({
    message: "Hello World",
  });
});

http.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on ${PORT}`);
});
