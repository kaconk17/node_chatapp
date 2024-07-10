const express = require("express");
// controllers
const {onGetAllUsers, onCreateUser,onGetUserById,onDeleteUserById} = require("../controllers/user");

const router = express.Router();

router
  .get('/', onGetAllUsers)
  .post('/', onCreateUser)
  .get('/:id', onGetUserById)
  .delete('/:id', onDeleteUserById)

module.exports = router;