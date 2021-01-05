//Include libraries
const express = require("express");
const socket = require("socket.io");
const path = require("path");

//Listen to the port
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`We are online at http://{IP}:${port}`);
});

//incert the static files
app.use("/public", express.static(path.join(__dirname, "static")));
//run the index.html as starter
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});
//route username
app.get("/username", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "name.html"));
});

//SocketSetup
const io = socket(server);
io.on("connection", (socket) => {
  console.log("We got new connection ", socket.id);

  //New user connected
  socket.on("newUser", function (username) {
    socket.username = username;
    console.log("New user name:", username);
    io.sockets.emit("newHere", username);
  });

  //an user is disconected
  socket.on("disconnect", function () {
    console.log(`${socket.username} Disconnected from Server`);
    io.sockets.emit("oldGone", socket.username);
  });

  //response chat
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  //tesponce typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
