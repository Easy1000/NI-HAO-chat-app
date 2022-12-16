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
    origin: true, // connect to client server and receive from any client
  },
});

let users = []; // array of users
let messages = []; // array of all the messages sent from clients

socketIO.on("connection", (socket) => {
  // open socket for connection
  console.log(`⚡: ${socket.id} user just connected!`); // log clients that are connected

  socket.on("newBuddy", (data) => {
    for(const room of socket.rooms) socket.leave(room)
    socket.join(`${data.name} ${data.buddy}`);
    socketIO.in(`${data.name} ${data.buddy}`).emit(
      "messageResponse",
      messages.filter(
        (message) =>
          (message.name === data.name && message.buddy === data.buddy) ||
          (message.name === data.buddy && message.buddy === data.name)
      )
    );
    socket.leave(`${data.name} ${data.buddy}`);
  });

  // receive message and add it to messages array
  socket.on("message", (data) => {
    socket.join(`${data.name} ${data.buddy}`);
    messages.push(data);
    // socketIO.emit("messageResponse", messages);
    socketIO
      .in(`${data.name} ${data.buddy}`)
      .in(`${data.buddy} ${data.name}`)
      .emit(
        "messageResponse",
        messages.filter(
          (message) =>
            (message.name === data.name && message.buddy === data.buddy) ||
            (message.name === data.buddy && message.buddy === data.name)
        )
      );
    console.log(socket.rooms);
    // socket.leave(`${data.name} ${data.buddy}`);
    console.log(socket.rooms);
    // for(const room of socket.rooms) console.log(room)
    console.log(data);
  });

  // receive new user and add it to users array
  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
    // socketIO.emit("messageResponse", messages);
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

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
