const express = require ('express');
// controllers
const {initiate, postMessage,getRecentConversation,getConversationByRoomId, markConversationReadByRoomId} = require("../controllers/chatroom");

const router = express.Router();

router
  .get('/', getRecentConversation)
  .get('/:roomId', getConversationByRoomId)
  .post('/initiate', initiate)
  .post('/:roomId/message', postMessage)
  .put('/:roomId/mark-read', markConversationReadByRoomId)

module.exports = router;