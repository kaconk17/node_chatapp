const express = require("express");
// controllers
const {deleteMessageById, deleteRoomById} = require('../controllers/delete.js');

const router = express.Router();

router
  .delete('/room/:roomId', deleteRoomById)
  .delete('/message/:messageId', deleteMessageById)

module.exports = router;