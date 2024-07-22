const express = require("express");
// controllers
const {createUser, signinUser, getUser, getAllUser,} = require("../controllers/user");

const router = express.Router();

router
  .get('/', getAllUser)
  .post('/', createUser)
  .get('/:id', getUser)
  .delete('/:id', onDeleteUserById)

module.exports = router;