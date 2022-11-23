const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://10.6.165.86:3000",
  },
});

let users = []

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    socketIO.emit('messageResponse', data)
    console.log(data)
  });

  socket.on('newUser', (data) => {
    users.push(data)
    socketIO.emit('newUserResponse', users)
  })

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id)
    socketIO.emit('newUserResponse', users)
    socket.disconnect()
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
