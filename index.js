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
const userRoute = require("./routes/user");
const cors = require("cors");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use("/static", express.static(join(__dirname, "public")));
app.use("/", userRoute);
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "chat.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "login.html"));
});
io.engine.use((req, res, next) => {
  const isHandshake = req._query.sid === undefined;
  if (!isHandshake) {
    return next();
  }
  const header = req.headers["authorization"];

  if (!header) {
    return next(new Error("no token"));
  }

  if (!header.startsWith("bearer ")) {
    return next(new Error("invalid token"));
  }

  const token = header.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // req.user = {
    //   email: decoded.email,
    //   user_id: decoded.user_id,
    // };
    //console.log(decoded.email);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("tokensalah");
    return next(new Error("invalid token"));
  }
});
io.on("connection", async (socket) => {
  //const useremail = socket.request.user.email;

  socket.join(socket.request.user.user_id);
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: socket.request.user.user_id,
      usermail: socket.request.user.email,
    });
  }
  socket.emit("users", users);
  socket.on("chat", (msg) => {
    console.log("Message: " + msg);
  });
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.request.user.user_id,
      to,
    };
    socket
      .to(to)
      .to(socket.request.user.user_id)
      .emit("private message", message);
    //messageStore.saveMessage(message);
  });
  socket.on("disconnect", async () => {
    const matchingSockets = await io
      .in(`user:${socket.request.user.user_id}`)
      .fetchSockets();
    const isDisconnected = matchingSockets.length === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.request.user.user_id);
      // update the connection status of the session
      // sessionStore.saveSession(socket.sessionID, {
      //   userID: socket.userID,
      //   username: socket.username,
      //   connected: false,
      // });
      console.log(`user disconnected ${socket.request.user.user_id}`);
      // const users = [];
      // for (let [id, socket] of io.of("/").sockets) {
      //   users.push({
      //     userID: socket.request.user.user_id,
      //     usermail: socket.request.user.email,
      //   });
      // }
      // socket.emit("users", users);
    }
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
