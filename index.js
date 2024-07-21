const { dirname, join } = require("path");
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use("/static", express.static(join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "chat.html"));
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.log("Invalid token!");
    return next(new Error("invalid token"));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.data;
    next();
  } catch (error) {
    return next(new Error("invalid token"));
  }
  // jwt.verify(token, process.env.SECRET, (err, decoded) => {
  //   if (err) {
  //     return next(new Error("invalid token"));
  //   }
  //   req.user = decoded.data;
  //   next();
  // });
  console.log(token);
  //next();
});
io.on("connection", async (Socket) => {
  console.log("a user connected");
  Socket.on("chat", (msg) => {
    console.log("Message: " + msg);
  });
  Socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
