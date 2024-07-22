const express = require("express");
// controllers
const {
  createUser,
  signinUser,
  getUser,
  getAllUser,
  delUser,
} = require("../controllers/user");

const router = express.Router();

router
  .get("/user/getall", getAllUser)
  .post("/auth/signin", signinUser)
  .post("/user/create", createUser)
  .get("/user/get/:id", getUser)
  .delete("/user/del/:id", delUser);

module.exports = router;
