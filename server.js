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
//run the index.html as server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

//SocketSetup
const io = socket(server);
io.on("connection", (socket) => {
  console.log("We got new user:", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
