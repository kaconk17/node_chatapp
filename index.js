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

require("dotenv").config();

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
  console.log(socket.request.user.email);
  socket.on("chat", (msg) => {
    console.log("Message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
